from testingtool import urls
from rest_framework.response import Response
from rest_framework.schemas import SchemaGenerator
from rest_framework.permissions import AllowAny
from rest_framework.decorators import (api_view, renderer_classes,
                                       permission_classes)
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer


@api_view()
@permission_classes((AllowAny, ))
@renderer_classes([SwaggerUIRenderer, OpenAPIRenderer])
def schema_view(request):
    generator = SchemaGenerator(
        title='TestingTool API Docs',
        patterns=urls.urlpatterns
    )
    return Response(generator.get_schema())
