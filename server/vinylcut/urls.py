from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from vinylcutapi.views import login_user, register_user
from rest_framework import routers
from vinylcutapi.views import AlbumView


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'albums', AlbumView, 'album')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('register', register_user),
    path('login', login_user),
    path('', include(router.urls)),
]
