from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [path('admin/', admin.site.urls),
               path('auth/', include('djoser.urls')),
               path('auth/', include('djoser.urls.jwt')),
               path('api/users/', include('apps.users.urls')),
               path('api/store/', include('apps.store.urls')),
               path('api/category/', include('apps.category.urls')),
               path('api/inventory/', include('apps.inventory.urls')),
               path('api/order/', include('apps.order.urls')),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
