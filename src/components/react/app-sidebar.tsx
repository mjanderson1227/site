import {
  Calendar,
  Home,
  ChevronRight,
  Inbox,
  Newspaper,
  Search,
  ShieldUser,
  Settings,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Menu items.
const contentItems = [
  {
    title: "Blog Posts",
    icon: Newspaper,
  },
];

const navigationItems = [
  {
    title: "Dashboard",
    location: "/admin",
    icon: Home,
  },
];

const blogPostItemsExample: BlogPostLink[] = [
  {
    title: "My First Blog Post",
    slug: "my-first-blog-post",
    date: "2023-10-01",
  },
  {
    title: "Understanding React",
    slug: "understanding-react",
    date: "2023-10-02",
  },
  {
    title: "Advanced CSS Techniques",
    slug: "advanced-css-techniques",
    date: "2023-10-03",
  },
];

type BlogPostLink = {
  title: string;
  slug: string;
  date: string;
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  blogPosts?: BlogPostLink[];
}

export function AppSidebar({
  blogPosts = blogPostItemsExample,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2 w-full">
          <ShieldUser />
          <h1 className="text-lg font-semibold">Admin</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.location} className="flex items-center">
                      <item.icon className="mr-2" />
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Collapsible className="group/collapsible">
                    <CollapsibleTrigger asChild className="w-full">
                      <Button variant="ghost" className="flex justify-between">
                        <div className="flex items-center">
                          <item.icon className="mr-2" />
                          <h1>{item.title}</h1>
                        </div>
                        <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {blogPosts?.map((post) => (
                          <SidebarMenuSubItem key={post.slug}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={`/admin/blog/${post.slug}`}
                                className="flex items-center w-full text-ellipsis text-nowrap"
                              >
                                {post.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
