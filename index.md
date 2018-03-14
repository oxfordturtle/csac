---
---
# Computer Science Across the Curriculum

## Applying Computer Science for Fun and Learning, from the Sciences to the Humanities

{% for chapter in site.data.chapters %}
  {{ forloop.index }}. [{{ chapter.title }}]({{ site.baseurl }}/{{ chapter.url }})
{% endfor %}
