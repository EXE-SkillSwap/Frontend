import { getUserProfile } from "@/api/services/userService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const user = {
    name: "Sarah Johnson",
    title: "Senior Frontend Developer",
    bio: "Passionate frontend developer with 5+ years of experience building modern web applications. I love creating intuitive user experiences and working with cutting-edge technologies.",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=200&width=800",
    location: "San Francisco, CA",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2019",
    company: "TechCorp Inc.",
    education: "BS Computer Science, Stanford University",
    website: "https://sarahjohnson.dev",
    social: {
      github: "sarahjohnson",
      linkedin: "sarah-johnson-dev",
      twitter: "sarahcodes",
    },
  };

  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "AWS",
    "Docker",
    "Jest",
    "Figma",
  ];

  const recentActivity = [
    {
      id: 1,
      type: "project",
      title: "Launched new e-commerce platform",
      description:
        "Successfully deployed a React-based e-commerce solution with 99.9% uptime",
      date: "2 days ago",
      icon: Briefcase,
    },
    {
      id: 2,
      type: "achievement",
      title: "Completed AWS Certification",
      description: "Earned AWS Solutions Architect Associate certification",
      date: "1 week ago",
      icon: Star,
    },
    {
      id: 3,
      type: "education",
      title: "Finished Advanced React Course",
      description:
        "Completed advanced patterns and performance optimization course",
      date: "2 weeks ago",
      icon: GraduationCap,
    },
  ];

  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserProfile();
      console.log(response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const processSkills = (skills) => {
    if (!skills) return [];
    return skills.split("#").map((skill) => skill.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="min-h-screen bg-background">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                      <AvatarImage src={userInfo?.avatarUrl} alt={user.name} />
                      <AvatarFallback className="text-2xl">
                        {userInfo?.firstName?.charAt(0)}
                        {userInfo?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold mt-4">
                      {userInfo?.firstName} {userInfo?.lastName}
                    </h1>
                    {userInfo?.bio && (
                      <p className="text-muted-foreground">{userInfo?.bio}</p>
                    )}

                    {userInfo?.location && (
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {userInfo?.location}
                      </div>
                    )}
                  </div>

                  <Separator className="my-6" />

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="truncate">{userInfo?.email}</span>
                    </div>
                    {userInfo?.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{userInfo?.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>Tham gia {userInfo?.createdAt}</span>
                    </div>
                  </div>

                  <Separator className="my-6" />
                </CardContent>
              </Card>

              {/* Skills Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {processSkills(userInfo?.skillTags).map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {user.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-4 p-4 rounded-lg border"
                        >
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {activity.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
