import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categorías',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nombre de la Categoría',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      title: 'Slug',
    }),
  ],
})