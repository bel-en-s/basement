import { defineField, defineType } from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'links', type: 'array', of: [{ 
            type: 'object', 
            fields: [{name: 'label', type: 'string'}, {name: 'href', type: 'string'}] 
          }]}
        ]
      }]
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Logo Basement Fondo',
    }
  ]
}
)