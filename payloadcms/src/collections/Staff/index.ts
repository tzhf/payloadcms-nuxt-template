import { and, isAdmin, isStaff, isSuperAdmin, not, or } from '@/access'

import type {
  Access,
  CollectionConfig,
  FieldAccess,
  FieldHook,
  Validate,
} from 'payload'
import type { Staff as StaffType } from 'payload-types'

const roleOptions = [
  {
    label: 'Super Admin',
    value: 'super_admin',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
]

type Role = (typeof roleOptions)[number]['value']

const getRoleIndex = (role: Role) =>
  roleOptions.findIndex(({ value }) => role === value)

const isCurrentUser: Access<StaffType> = ({ req: { user }, id }) =>
  user?.id === id
const isUpdatingSuperAdmin: Access<StaffType> = ({ data }) =>
  data?.role === 'super_admin'

export const Staff: CollectionConfig = {
  slug: 'staff',

  admin: {
    group: '🗄️ Admin',
    useAsTitle: 'fullName',
  },
  labels: {
    singular: '👤 Staff',
    plural: '👤 Staff',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24,
  },
  access: {
    create: or(isSuperAdmin, isAdmin),
    read: isStaff,
    update: or(
      isSuperAdmin,
      and(isAdmin, not(isUpdatingSuperAdmin)),
      isCurrentUser,
    ),
    delete: or(isSuperAdmin, isAdmin),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'fullName',
          type: 'text',
          admin: { hidden: true },
          hooks: {
            beforeChange: [
              (({ data }) =>
                data
                  ? [data.firstName, data.lastName].join(' ')
                  : '') as FieldHook<StaffType>,
            ],
          },
        },
      ],
    },
    {
      name: 'role',
      type: 'select',
      // access: {
      //   update: (({ req }) =>
      //     req.user?.collection === 'staff' &&
      //     ['super_admin', 'admin'].includes(req.user.role)) as FieldAccess,
      // },
      validate: (async (value, { data, req }) => {
        if (!req.user || !value) return true // Allow first user creation

        const currentUserRole = req.user.role ?? ''
        const newRole = value as Role

        const isSelfEdit =
          data.email?.toLowerCase() === req.user.email?.toLowerCase()
        const isDowngrade =
          getRoleIndex(newRole) > getRoleIndex(currentUserRole)

        if (currentUserRole === 'admin' && isSelfEdit && isDowngrade) {
          return `You cannot downgrade yourself to a role with lower access (${currentUserRole} > ${newRole}).`
        }

        return true
      }) as Validate<string, StaffType>,
      required: true,
      saveToJWT: true,
      options: roleOptions,
    },
  ],
}
