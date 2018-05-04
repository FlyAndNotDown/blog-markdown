> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

在django中，上传文件不同于普通服务器的上传方法，在普通服务器中只需要使用一个Controller来控制文件的上传即可完成，但是在django中，则需要额外使用数据库资源来存储文件。本文将说明如何使用django接收、保存并且返回图片。

# 准备
首先，你需要为你的python安装pillow，pillow是一个python图像库，django的图片方面的功能使用到了它，所以我们需要事先安装：
```
pip install pillow
```
安装完成之后我们需要在django的settings.py中更改一些设置：
```
# settings.py
# 在末尾添加

MEDIA_ROOT = os.path.join(BASE_DIR, 'media').replace('\\', '/')

MEDIA_URL = '/media/'
```

# Model
之前说到了django的图片需要使用额外的数据库资源来存储文件，这样的设定并不是把图片数据本身存在数据库，而是django将会自动将文件上传到你设置的位置，并且把上传之后的图片path存入数据库，这样你只需要访问数据库中的path即可访问到图片。

在你的应用目录下的models.py里新建一个图片Model
```
from django.db import models


class Image(models.Model):
    # 图片
    img = models.ImageField(upload_to='img')
    # 创建时间
    time = models.DateTimeField(auto_now_add=True)
```
这样做之后，一旦数据库对象被创建，img表列接受的图片对象将会自动被上传到/media/img文件夹中，在上传完成之后，img将会保存图片的path。

# View
主流服务器接受文件都需要自己写一个响应，django也不例外。

在你的应用下的views.py中新建一个响应:
```
from .models import Image
from django.shortcuts import HttpResponse
import json


MEDIA_SERVER = 'http://127.0.0.1:8000/media/'


class ImageTool:
    @staticmethod
    def get_new_random_file_name(file_name):
        find_type = False
        for c in file_name:
            if c == '.':
                find_type = True
        if find_type:
            type = file_name.split('.')[-1]
            return str(uuid.uuid1()) + '.' + type
        else:
            return str(uuid.uuid1())


def image_upload(request):
    source = request.FILES.get('image')
    if source:
      source.name = ImageTool.get_new_random_file_name(source.name)
      image = Image(
          img=source
      )
      image.save()
      return HttpResponse(json.dumps({
          'success': True,
          'path': MEDIA_SERVER + image.img.url
      }))
  else:
      return HttpResponse(json.dumps({
          'success': False,
          'error_code': 100
      }))
```
响应的主体是image_upload方法，而ImageTool中get_new_random_file_name方法是为了获取一个新的uuid随机新名字，这样做的原因是因为图片可能有重名的状况，虽然如果遇到这样的事情django会自动为我们处理，但是为了保持名字的可管理性和统一性，自己写一个重命名的方法会更好。

# Url
最后只需要在url中添加文件上传view的url即可:
```
# urls.py

from django.urls import path
from . import views

urlpatterns = [
    ...

    path('file/image_upload', views.file__image_upload)
]
```

# 上传图片和访问图片
完成这些后，你只需要在前端需要上传图片的地方将url指向这个地址，就能将图片成功上传，上传完成之后你可以使用/media/加上数据库中图片的path就能访问到图片。
