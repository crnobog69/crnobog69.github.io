declare module "*.json" {
  const value: {
    projects: Array<{
      title: string;
      description: string;
      technologies: string[];
      url: string;
    }>;
  };
  export default value;
}
