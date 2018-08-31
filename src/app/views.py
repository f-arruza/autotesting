import json
import secrets
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from rest_framework import views
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import permission_classes

from validate_email import validate_email

from app.tasks import send_email_password_reset


# Create your views here.
class PasswordResetView(views.APIView):
    '''
    Recuperar clave de acceso.
    '''
    permission_classes = (AllowAny,)

    def post(self, request):
        result = {
            "success": 'false',
            "message": '',
        }
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            try:
                correo = json_data['correo']
                if not validate_email(correo):
                    result['message'] = 'Debe ingresar una dirección de \
correo electrónico válida.'
                    return JsonResponse(result, safe=False)

                try:
                    usuario = User.objects.get(is_active=True, email=correo)
                    password = secrets.token_urlsafe(8)
                    print(password)
                    usuario.set_password(password)
                    usuario.save()

                    # Enviar notificación
                    data = {
                        "nombre": usuario.first_name + ' ' + usuario.last_name,
                        "correo": usuario.email,
                        "usuario": usuario.username,
                        "clave": password,
                    }
                    send_email_password_reset.delay('recuperar clave', data)
                    result['success'] = 'true'
                    result['message'] = 'Clave enviada a su correo\
 electrónico.'
                except Exception as ex:
                    result['message'] = 'La dirección de correo ingresada está\
 incorrecta.'
            except KeyError:
                result['message'] = 'Debe ingresar su dirección de correo.'
        except Exception as ex:
            result['message'] = 'Ha ocurrido un error al recuperar la clave.'
        return JsonResponse(result, safe=False)


class PasswordChangeView(views.APIView):
    '''
    Cambiar clave de acceso de usuario autenticado.
    '''

    def post(self, request):
        result = {
            "success": 'false',
            "message": '',
        }
        try:
            json_data = json.loads(request.body.decode('utf-8'))

            try:
                password = json_data['password']
                new_password = json_data['new_password']

                try:
                    validate_password(new_password)
                except ValidationError:
                    result['message'] = 'La nueva clave no cumple con los \
requisitos esperados.'
                    return JsonResponse(result, safe=False)

                usuario = authenticate(username=request.user.username,
                                       password=password)
                if usuario is None:
                    result['message'] = 'Clave actual incorrecta.'
                    return JsonResponse(result, safe=False)
                usuario.set_password(new_password)
                usuario.save()
                result['success'] = 'true'
                result['message'] = 'Clave actualizada.'
                return JsonResponse(result, safe=False)
            except KeyError:
                result['message'] = 'Debe ingresar su clave actual y la nueva\
 clave.'
                return JsonResponse(result, safe=False)
        except Exception as ex:
            result['message'] = 'Ha ocurrido un error al cambiar la clave.'
            return JsonResponse(result, safe=False)


class PasswordRedefineView(views.APIView):
    '''
    Cambiar clave de acceso sin estar autenticado.
    '''
    permission_classes = (AllowAny,)

    def post(self, request):
        result = {
            "success": 'false',
            "message": '',
        }
        try:
            json_data = json.loads(request.body.decode('utf-8'))

            try:
                username = json_data['username']
                password = json_data['password']
                new_password = json_data['new_password']

                try:
                    validate_password(new_password)
                except ValidationError:
                    result['message'] = 'La nueva clave no cumple con los \
requisitos esperados.'
                    return JsonResponse(result, safe=False)

                usuario = authenticate(username=username, password=password)
                if usuario is None:
                    result['message'] = 'Usuario o clave actual incorrecta.'
                    return JsonResponse(result, safe=False)
                usuario.set_password(new_password)
                usuario.save()

                result['success'] = 'true'
                result['message'] = 'Clave actualizada.'
                return JsonResponse(result, safe=False)
            except KeyError:
                result['message'] = 'Debe ingresar su usuario, la clave \
actual y la nueva clave.'
                return JsonResponse(result, safe=False)
        except Exception as ex:
            result['message'] = 'Ha ocurrido un error al cambiar la clave.'
            return JsonResponse(result, safe=False)
