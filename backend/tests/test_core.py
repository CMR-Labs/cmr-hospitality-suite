import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.fixture(scope="session")
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c


@pytest.fixture(scope="session")
async def token(client):
    login = await client.post("/api/v1/auth/login", json={
        "email": "demo@cmrhospitality.com",
        "password": "CMRDemo2026"
    })
    return login.json()["access_token"]


@pytest.mark.anyio
async def test_get_rooms(client, token):
    response = await client.get("/api/v1/rooms/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.anyio
async def test_get_guests(client, token):
    response = await client.get("/api/v1/guests/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.anyio
async def test_get_payments(client, token):
    response = await client.get("/api/v1/payments/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.anyio
async def test_get_reservations(client, token):
    response = await client.get("/api/v1/reservations/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.anyio
async def test_get_analytics(client, token):
    response = await client.get("/api/v1/analytics/summary", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    data = response.json()
    assert "rooms" in data
    assert "guests" in data
    assert "revenue" in data


@pytest.mark.anyio
async def test_get_staff(client, token):
    response = await client.get("/api/v1/staff/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200


@pytest.mark.anyio
async def test_get_housekeeping(client, token):
    response = await client.get("/api/v1/housekeeping/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200


@pytest.mark.anyio
async def test_get_event_halls(client, token):
    response = await client.get("/api/v1/events/halls", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200


@pytest.mark.anyio
async def test_get_subscription(client, token):
    response = await client.get("/api/v1/subscription/current", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    data = response.json()
    assert "plan" in data
    assert "subscription" in data
    assert "usage" in data
