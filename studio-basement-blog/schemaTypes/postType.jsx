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
      description: 'Este texto aparece en la columna derecha del header '
    }),
    defineField({ 
      name: 'excerpt', 
      type: 'text', 
      title: 'Extracto',
      description: 'Este texto aparece en la columna derecha del header mas pequeño'
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
      // --- ENTRADA DE BLOG PERSONALIZABLE ---
    defineField({
      name: 'body',
      title: 'Contenido del Artículo',
      description: 'Aquí puedes añadir párrafos, títulos, listas y citas personalizadas.',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Párrafo Normal', value: 'normal' },
            { title: 'Título Grande (H2)', value: 'h2' },
            { title: 'Título Medio (H3)', value: 'h3' },
            { title: 'Cita Lateral', value: 'blockquote' }
          ],
          lists: [
            { title: 'Lista de puntos', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' }
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