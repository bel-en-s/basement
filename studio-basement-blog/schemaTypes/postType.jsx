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
      name: 'author',
      title: 'Autor',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
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
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
        },
        { 
          type: 'image',
          options: { hotspot: true }
        },
        defineField({
          name: 'customQuote',
          type: 'object',
          title: 'Cita Destacada (Estilo Figma)',
          fields: [
            { name: 'text', type: 'text', title: 'Texto de la cita' },
            { name: 'author', type: 'string', title: 'Autor de la cita' },
            { name: 'role', type: 'string', title: 'Cargo/Rol' }
          ]
        })
      ]
    }),
  ],
})