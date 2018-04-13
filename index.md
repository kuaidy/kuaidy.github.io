<ul>
  {% for post in site.posts %}
    <div>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </div>
  {% endfor %}
</ul>
