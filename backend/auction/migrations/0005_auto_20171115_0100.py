# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-15 01:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0004_sale'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='note',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='sale',
            name='tracking_number',
            field=models.CharField(default='', max_length=100),
        ),
    ]
