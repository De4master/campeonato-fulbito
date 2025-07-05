from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import F
from collections import defaultdict

from .models import Tournament, Stage, Group, Team, Player, Venue, Referee, Match, MatchEvent, Standing
from .serializers import (
    TournamentSerializer, StageSerializer, GroupSerializer,
    TeamSerializer, PlayerSerializer, VenueSerializer,
    RefereeSerializer, MatchSerializer, MatchEventSerializer, StandingSerializer
)

# ----------------------
# CRUD API ViewSets
# ----------------------

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class RefereeViewSet(viewsets.ModelViewSet):
    queryset = Referee.objects.all()
    serializer_class = RefereeSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

class MatchEventViewSet(viewsets.ModelViewSet):
    queryset = MatchEvent.objects.all()
    serializer_class = MatchEventSerializer

class StandingViewSet(viewsets.ModelViewSet):
    queryset = Standing.objects.all()
    serializer_class = StandingSerializer

# ----------------------
# Endpoints públicos
# ----------------------

class PublicStandingsView(APIView):
    def get(self, request, tournament_id):
        standings = Standing.objects.filter(tournament_id=tournament_id).order_by('-points', '-gd', '-gf')
        data = StandingSerializer(standings, many=True).data
        return Response(data)

class PublicScheduleView(APIView):
    def get(self, request, stage_id):
        matches = Match.objects.filter(stage_id=stage_id).order_by('date')  # 👈 usamos 'date'
        serialized_matches = MatchSerializer(matches, many=True).data
        for match in serialized_matches:
            events = MatchEvent.objects.filter(match_id=match["id"]).order_by("minute")
            match["events"] = MatchEventSerializer(events, many=True).data
        return Response(serialized_matches)

# ----------------------
# Calcular tabla de posiciones
# ----------------------

class CalculateStandingsView(APIView):
    def get(self, request, tournament_id):
        Standing.objects.filter(tournament_id=tournament_id).delete()

        table = defaultdict(lambda: {
            "points": 0, "played": 0, "wins": 0, "draws": 0,
            "losses": 0, "gf": 0, "ga": 0
        })

        matches = Match.objects.filter(stage__tournament_id=tournament_id)
        for match in matches:
            home_goals = MatchEvent.objects.filter(match=match, player__team=match.team_home, event_type='GOL').count()
            away_goals = MatchEvent.objects.filter(match=match, player__team=match.team_away, event_type='GOL').count()

            table[match.team_home.id]["gf"] += home_goals
            table[match.team_home.id]["ga"] += away_goals
            table[match.team_away.id]["gf"] += away_goals
            table[match.team_away.id]["ga"] += home_goals

            table[match.team_home.id]["played"] += 1
            table[match.team_away.id]["played"] += 1

            if home_goals > away_goals:
                table[match.team_home.id]["points"] += 3
                table[match.team_home.id]["wins"] += 1
                table[match.team_away.id]["losses"] += 1
            elif home_goals < away_goals:
                table[match.team_away.id]["points"] += 3
                table[match.team_away.id]["wins"] += 1
                table[match.team_home.id]["losses"] += 1
            else:
                table[match.team_home.id]["points"] += 1
                table[match.team_away.id]["points"] += 1
                table[match.team_home.id]["draws"] += 1
                table[match.team_away.id]["draws"] += 1

        for team_id, data in table.items():
            Standing.objects.create(
                team_id=team_id,
                tournament_id=tournament_id,
                points=data["points"],
                played=data["played"],
                wins=data["wins"],
                draws=data["draws"],
                losses=data["losses"],
                gf=data["gf"],
                ga=data["ga"],
                gd=data["gf"] - data["ga"]
            )

        return Response({"message": "Tabla de posiciones actualizada."})
