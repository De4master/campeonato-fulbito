from django.db import models

class Tournament(models.Model):
    name = models.CharField(max_length=100)
    year = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} ({self.year})"

    class Meta:
        verbose_name = "Torneo"
        verbose_name_plural = "Torneos"

class Group(models.Model):
    name = models.CharField(max_length=100)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Grupo"
        verbose_name_plural = "Grupos"

class Team(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='team_logos/', blank=True, null=True)
    coach_name = models.CharField(max_length=100)
    founded = models.PositiveIntegerField()
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Equipo"
        verbose_name_plural = "Equipos"

class Player(models.Model):
    POSITION_CHOICES = [
        ('GK', 'Arquero'),
        ('DF', 'Defensa'),
        ('MF', 'Mediocampo'),
        ('FW', 'Delantero'),
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    position = models.CharField(max_length=2, choices=POSITION_CHOICES)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = "Jugador"
        verbose_name_plural = "Jugadores"

class Referee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = "Árbitro"
        verbose_name_plural = "Árbitros"

class Venue(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Cancha"
        verbose_name_plural = "Canchas"

class Stage(models.Model):
    name = models.CharField(max_length=100)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Etapa"
        verbose_name_plural = "Etapas"

class Match(models.Model):
    team_home = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    team_away = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    date = models.DateField()  # ✅ Este campo es esencial
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
    referee = models.ForeignKey(Referee, on_delete=models.SET_NULL, null=True, blank=True)
    venue = models.ForeignKey(Venue, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.team_home} vs {self.team_away}"

    class Meta:
        verbose_name = "Partido"
        verbose_name_plural = "Partidos"

class MatchEvent(models.Model):
    EVENT_CHOICES = [
        ('GOL', 'Gol'),
        ('AMARILLA', 'Tarjeta Amarilla'),
        ('ROJA', 'Tarjeta Roja'),
        ('OTRO', 'Otro')
    ]
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    minute = models.PositiveIntegerField()
    event_type = models.CharField(max_length=10, choices=EVENT_CHOICES)

    def __str__(self):
        return f"{self.event_type} - {self.player} ({self.minute}')"

    class Meta:
        verbose_name = "Evento del Partido"
        verbose_name_plural = "Eventos del Partido"

class Standing(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    played = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    gf = models.IntegerField(default=0)
    ga = models.IntegerField(default=0)
    gd = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.team.name} - {self.points} pts"

    class Meta:
        verbose_name = "Tabla de Posiciones"
        verbose_name_plural = "Tabla de Posiciones"
