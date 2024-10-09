import NoMatch from "@/pages/no-match"
import NoPermission from "@/pages/no-permission"

const routes = [
  {
    path: "/",
    async lazy() {
      const comp = await import("@/pages/authentication")
      return { Component: comp.default }
    },
    children: [
      {
        index: true,
        async lazy() {
          const comp = await import("@/pages/authentication/login-form")
          return { Component: comp.default }
        },
      },
      {
        path: "/sign-in",
        async lazy() {
          const comp = await import("@/pages/authentication/sign-in-form")
          return { Component: comp.default }
        },
      },
    ],
  },
  {
    async lazy() {
      const comp = await import("@/components/base-layout")
      return { Component: comp.default }
    },
    children: [
      {
        path: "dashboard",
        async lazy() {
          const comp = await import("@/pages/dashboard")
          return { Component: comp.default }
        },
      },
      {
        path: "profile",
        async lazy() {
          const comp = await import("@/pages/profile")
          return { Component: comp.default }
        },
        children: [
          {
            path: "info",
            async lazy() {
              const comp = await import("@/pages/profile/user-info")
              return { Component: comp.default }
            },
          },
          {
            path: "avatar",
            async lazy() {
              const comp = await import("@/pages/profile/user-avatar")
              return { Component: comp.default }
            },
          },
        ]
      },
      {
        path: "view/:id",
        async lazy() {
          const comp = await import("@/pages/view")
          return { Component: comp.default }
        },
      }
    ],
  },
  {
    path: "/no-permission",
    element: <NoPermission />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]

export default routes
