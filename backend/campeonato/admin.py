from django.contrib import admin
from .models import Team, Player, Referee, Venue, Match, MatchEvent, Tournament, Stage, Group, Standing

admin.site.register(Team, type('TeamAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Equipo',
    'verbose_name_plural': 'Equipos'
}))

admin.site.register(Player, type('PlayerAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Jugador',
    'verbose_name_plural': 'Jugadores'
}))

admin.site.register(Referee, type('RefereeAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Árbitro',
    'verbose_name_plural': 'Árbitros'
}))

admin.site.register(Venue, type('VenueAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Cancha',
    'verbose_name_plural': 'Canchas'
}))

admin.site.register(Match, type('MatchAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Partido',
    'verbose_name_plural': 'Partidos'
}))

admin.site.register(MatchEvent, type('MatchEventAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Evento del Partido',
    'verbose_name_plural': 'Eventos del Partido'
}))

admin.site.register(Tournament, type('TournamentAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Torneo',
    'verbose_name_plural': 'Torneos'
}))

admin.site.register(Stage, type('StageAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Etapa',
    'verbose_name_plural': 'Etapas'
}))

admin.site.register(Group, type('GroupAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Grupo',
    'verbose_name_plural': 'Grupos'
}))

admin.site.register(Standing, type('StandingAdmin', (admin.ModelAdmin,), {
    'verbose_name': 'Tabla de Posiciones',
    'verbose_name_plural': 'Tabla de Posiciones'
}))

# Personalización del encabezado
admin.site.site_header = "Administración del Campeonato de Fulbito"
admin.site.site_title = "Panel de Administración"
admin.site.index_title = "Gestión de datos del torneo"
