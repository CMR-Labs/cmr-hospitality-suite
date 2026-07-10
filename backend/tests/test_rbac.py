import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.fixture(scope="session")
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c


@pytest.mark.unit
@pytest.mark.anyio
async def test_rooms_requires_auth(client):
    response = await client.get("/api/v1/rooms/")
    assert response.status_code in [401, 403]


@pytest.mark.unit
@pytest.mark.anyio
async def test_guests_requires_auth(client):
    response = await client.get("/api/v1/guests/")
    assert response.status_code in [401, 403]


@pytest.mark.unit
@pytest.mark.anyio
async def test_payments_requires_auth(client):
    response = await client.get("/api/v1/payments/")
    assert response.status_code in [401, 403]


@pytest.mark.unit
@pytest.mark.anyio
async def test_admin_requires_key(client):
    response = await client.get("/api/v1/admin/hotels")
    assert response.status_code == 403


@pytest.mark.unit
@pytest.mark.anyio
async def test_admin_with_wrong_key(client):
    response = await client.get("/api/v1/admin/hotels", headers={"x-admin-key": "wrong-key"})
    assert response.status_code == 403


@pytest.mark.integration
@pytest.mark.anyio
async def test_subscription_plans_public(client):
    response = await client.get("/api/v1/subscription/plans")
    assert response.status_code == 200
    plans = response.json()
    assert len(plans) >= 4


@pytest.mark.integration
@pytest.mark.anyio
async def test_admin_with_correct_key(client):
    response = await client.get("/api/v1/admin/hotels", headers={"x-admin-key": "cmr-admin-2025"})
    assert response.status_code == 200