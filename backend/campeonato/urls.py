from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TournamentViewSet, StageViewSet, GroupViewSet, TeamViewSet, PlayerViewSet,
    VenueViewSet, RefereeViewSet, MatchViewSet, MatchEventViewSet, StandingViewSet,
    PublicStandingsView, PublicScheduleView, CalculateStandingsView  # 👈 Importación nueva
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

    # Endpoints públicos
    path('public/standings/<int:tournament_id>/', PublicStandingsView.as_view(), name='public-standings'),
    path('public/schedule/<int:stage_id>/', PublicScheduleView.as_view(), name='public-schedule'),

    # Endpoint para calcular tabla
    path('calculate-standings/<int:tournament_id>/', CalculateStandingsView.as_view(), name='calculate-standings'),
]
