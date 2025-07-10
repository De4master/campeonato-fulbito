from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    TournamentViewSet, StageViewSet, GroupViewSet, TeamViewSet, PlayerViewSet,
    VenueViewSet, RefereeViewSet, MatchViewSet, MatchEventViewSet, StandingViewSet,
    PublicStandingsView, PublicScheduleView, CalculateStandingsView,
    registro_usuario
)

router = DefaultRouter()
router.register(r'tournaments', TournamentViewSet)
router.register(r'stages', StageViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'venues', VenueViewSet)
router.register(r'referees', RefereeViewSet)
router.register(r'matches', MatchViewSet)
router.register(r'match-events', MatchEventViewSet)
router.register(r'standings', StandingViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # 🔐 Autenticación con JWT
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registro/', registro_usuario, name='registro'),

    # 🌐 Endpoints públicos
    path('public/standings/<int:tournament_id>/', PublicStandingsView.as_view(), name='public-standings'),
    path('public/schedule/<int:stage_id>/', PublicScheduleView.as_view(), name='public-schedule'),

    # ⚽ Recalcular tabla de posiciones
    path('calculate-standings/<int:tournament_id>/', CalculateStandingsView.as_view(), name='calculate-standings'),
]
