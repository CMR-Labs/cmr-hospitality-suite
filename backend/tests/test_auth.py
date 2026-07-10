import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.fixture(scope="session")
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c


@pytest.mark.unit
@pytest.mark.anyio
async def test_health_check(client):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


@pytest.mark.unit
@pytest.mark.anyio
async def test_register_missing_fields(client):
    response = await client.post("/api/v1/auth/register", json={
        "email": "test@test.com"
    })
    assert response.status_code == 422


@pytest.mark.unit
@pytest.mark.anyio
async def test_me_without_token(client):
    response = await client.get("/api/v1/auth/me")
    assert response.status_code in [401, 403]


@pytest.mark.integration
@pytest.mark.anyio
async def test_login_invalid_credentials(client):
    response = await client.post("/api/v1/auth/login", json={
        "email": "nonexistent@test.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401


@pytest.mark.integration
@pytest.mark.anyio
async def test_login_demo_account(client):
    response = await client.post("/api/v1/auth/login", json={
        "email": "demo@cmrhospitality.com",
        "password": "CMRDemo2026"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "demo@cmrhospitality.com"


@pytest.mark.integration
@pytest.mark.anyio
async def test_me_with_token(client):
    login = await client.post("/api/v1/auth/login", json={
        "email": "demo@cmrhospitality.com",
        "password": "CMRDemo2026"
    })
    token = login.json()["access_token"]
    response = await client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["email"] == "demo@cmrhospitality.com"