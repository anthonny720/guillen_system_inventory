
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone

# Create your models here.
Roles = (('Administrador', 'Administrador'), ('Editor', 'Editor'), ('Visualizador', 'Visualizador'))


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=13, choices=Roles, default='Visualizador')
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Usuarios"
        verbose_name = "Usuario"
        ordering = ['-id']

class UserActivity(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, related_name='user_activity', null=True)
    action = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=timezone.now)

    def __str__(self):
        return f'{self.user} - {self.action} on {self.created_at.strftime("%Y-%m-%d %H:%M")}'

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'

    def get_user(self):
        if self.user is None:
            return 'Anonymous'
        return self.user.first_name

    def created_at_str(self):
        return str(self.created_at.strftime("%Y-%m-%d %H:%M"))
#
#
#
