from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context

from celery import shared_task


@shared_task(max_retries=2)
def send_email(email, subject, body_text, body_html):
    msg = EmailMultiAlternatives(subject, body_text, to=[email])
    msg.attach_alternative(body_html, "text/html")
    return msg.send()


@shared_task(max_retries=2)
def send_email_password_reset(subject, data):
    header_tmp = get_template('header_notification.html')
    footer_tmp = get_template('footer_notification.html')
    content_tmp = get_template('body_password_reset.html')

    subject = 'MINAGRICULTURA :: ' + subject
    message = 'Estimado(a) ' + data['nombre'] + ',\n\n'
    message = message + 'A continuación, te hacemos entrega de una clave '
    message = message + 'nueva que te permitirá iniciar sesión.\n\n'
    message = message + 'Usuario: ' + data['usuario'] + '\n'
    message = message + 'Clave: ' + data['clave'] + '\n\n'
    message = message + 'Cordial saludo,'

    d = {
         'nombre': data['nombre'],
         'usuario': data['usuario'],
         'clave': data['clave']
    }
    html_content = header_tmp.render() + content_tmp.render(d)
    html_content = html_content + footer_tmp.render()

    send_email(data['correo'], subject, message, html_content)
