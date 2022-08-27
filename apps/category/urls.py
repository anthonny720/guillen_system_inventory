from django.urls import path

from apps.category.views import ListCategoryView, UpdateCategoryView, DeleteCategoryView, CreateCategoryView, \
    DetailCategoryView

urlpatterns = [
    path('get-categories', ListCategoryView.as_view(), name='get-categories'),
    path('update-category/<id>', UpdateCategoryView.as_view(), name='update-category'),
    path('delete-category/<id>', DeleteCategoryView.as_view(), name='delete-category'),
    path('add-category', CreateCategoryView.as_view(), name='add-category'),
    path('detail-category/<slug>', DetailCategoryView.as_view(), name='detail-category')
]
