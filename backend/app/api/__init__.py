from fastapi import APIRouter
from app.api.routes.auth import router as auth_router
from app.api.routes.rooms import router as rooms_router
from app.api.routes.guests import router as guests_router
from app.api.routes.reservations import router as reservations_router
from app.api.routes.payments import router as payments_router
from app.api.routes.staff import router as staff_router
from app.api.routes.housekeeping import router as housekeeping_router
from app.api.routes.events import router as events_router
from app.api.routes.analytics import router as analytics_router
from app.api.routes.ai import router as ai_router
from app.api.routes.paystack import router as paystack_router
from app.api.routes.admin import router as admin_router
from app.api.routes.roles import router as roles_router
from app.api.routes.audit import router as audit_router
from app.api.routes.subscription import router as subscription_router
from app.api.routes.settings import router as settings_router
from app.api.routes.uploads import router as uploads_router

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth_router)
api_router.include_router(rooms_router)
api_router.include_router(guests_router)
api_router.include_router(reservations_router)
api_router.include_router(payments_router)
api_router.include_router(staff_router)
api_router.include_router(housekeeping_router)
api_router.include_router(events_router)
api_router.include_router(analytics_router)
api_router.include_router(ai_router)
api_router.include_router(paystack_router)
api_router.include_router(admin_router)
api_router.include_router(roles_router)
api_router.include_router(audit_router)
api_router.include_router(subscription_router)
api_router.include_router(settings_router)
api_router.include_router(uploads_router)