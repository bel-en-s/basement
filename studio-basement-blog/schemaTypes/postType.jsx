import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      type: 'string', 
      title: 'Título' 
    }),
    defineField({ 
      name: 'slug', 
      type: 'slug', 
      options: { source: 'title' },
      title: 'Slug (URL)' 
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
     type: 'array',
  of: [{ type: 'reference', to: [{ type: 'category' }] }],
     
    }),
    defineField({ 
      name: 'publishedAt', 
      type: 'datetime', 
      title: 'Fecha de publicación' 
    }),
    defineField({ 
      name: 'image', 
      type: 'image', 
      title: 'Imagen de portada',
      options: { hotspot: true }
    }),
    defineField({
      name: 'body',
      title: 'Contenido del Blog',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }]
    }),
  ],
})