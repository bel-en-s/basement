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
      name: 'subtitle', 
      type: 'text', 
      title: 'Subtítulo',
      description: 'Aparece en la columna derecha del header (H2)'
    }),
    defineField({ 
      name: 'excerpt', 
      type: 'text', 
      title: 'Extracto',
      description: 'Aparece en la columna derecha del header más pequeño'
    }),
    defineField({ 
      name: 'slug', 
      type: 'slug', 
      options: { source: 'title' },
      title: 'Slug (URL)' 
    }),
    defineField({
      name: 'featuredText',
      title: 'Featured Text',
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
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
    defineField({ 
      name: 'image', 
      type: 'image', 
      title: 'Imagen de portada',
      options: { hotspot: true }
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    
    // blog
    defineField({
      name: 'body',
      title: 'Contenido del Artículo',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Párrafo Normal', value: 'normal' },
            { title: 'Título Grande (H2)', value: 'h2' },
            { title: 'Título Medio (H3)', value: 'h3' },
          ],
          lists: [
            { title: 'Lista de puntos', value: 'bullet' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Itálica', value: 'em' },
            ],
          }
        },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Pie de foto' },
            { name: 'fullWidth', type: 'boolean', title: '¿Ancho completo?', initialValue: false }
          ]
        },
        // 
        {
          name: 'sideQuote',
          type: 'object',
          title: 'Cita Lateral ',
          fields: [
            { 
              name: 'quote', 
              type: 'text', 
              title: 'Texto de la Cita',
              rows: 3
            },
            { 
              name: 'author', 
              type: 'string', 
              title: 'Nombre del Autor' 
            },
            { 
              name: 'role', 
              type: 'string', 
              title: 'Cargo / Rol' 
            }
          ]
        },

        {
          name: 'customQuote',
          type: 'object',
          title: 'Cita Destacada (Estilo Grande)',
          fields: [
            { name: 'text', type: 'text', title: 'Texto de la Cita' },
            { name: 'author', type: 'string', title: 'Nombre del Autor' },
            { name: 'role', type: 'string', title: 'Cargo / Rol' }
          ]
        }
      ]
    }),
  ],
})