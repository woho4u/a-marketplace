"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Project from "@/components/Project";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ProjectInterface {
  _id: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  creator?: string;
  location?: string;
  materials?: string[];
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
  };
  available?: boolean;
  tags?: string[];
  dateCreated?: Date;
  ratings?: {
    average: number;
    reviews: string[];
  };
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      console.log(user);
      try {
        axios.post(API_URL + "api/add-user", {
          email: user.email,
          name: user.name,
          picture: user.picture,
          auth0Id: user.sub,
          nickname: user.nickname,
        });
      } catch (error) {
        console.error(error);
      }
    }
  });

  const [project, setProject] = useState<ProjectInterface>({
    _id: "",
    title: "",
    description: "",
    price: 0,
    category: "",
    creator: "test",
    location: "",
    materials: [],
    dimensions: {
      height: 0,
      width: 0,
      depth: 0,
    },
    available: false,
    tags: [],
    dateCreated: new Date(),
    ratings: {
      average: 0,
      reviews: [],
    },
  });

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(false);

  useEffect(() => {
    // axios.get("localhost:3000/get-projects").then((res) => setProjects(res.data));
    try {
      const fetchData = async () => {
        const response = await axios.get(API_URL + "api/get-projects");
        setProjects(response.data.data);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [newProject]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(API_URL + "api/add-project", {
        project: project,
      });
    } catch (error) {
      console.error(error);
    }
  };
  //
  //
  //
  //
  //
  //
  //
  //
  //
  const palettes = [
    {
      name: "Modern and Minimalist",
      colors: ["#4A90E2", "#50E3C2", "#F5F5F5", "#D0021B"],
    },
    {
      name: "Warm and Earthy",
      colors: ["#8D6E63", "#FFD54F", "#FFF8E1", "#E64A19"],
    },
    {
      name: "Vibrant and Playful",
      colors: ["#FF6F61", "#6B5B95", "#F7CAC9", "#88B04B"],
    },
    {
      name: "Cool and Professional",
      colors: ["#34495E", "#2ECC71", "#ECF0F1", "#E74C3C"],
    },
    {
      name: "Pastel and Soft",
      colors: ["#f5fbf4", "#3d2c2b", "#9a5b23", "#f4a834", "#1e397a"],
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-12 items-center font-[family-name:var(--font-geist-sans)]">
      {palettes.map((palette, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{palette.name}</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {palette.colors.map((color, idx) => (
              <div
                key={idx}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: color,
                  border:
                    color === "#F5F5F5" ||
                    color === "#FFF8E1" ||
                    color === "#FFFDD0"
                      ? "1px solid #ccc"
                      : "none",
                }}
              ></div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-1 h-80">
        <h1 className="text-4xl">Hello {user ? user.name : "Guest"}!</h1>
        <input
          placeholder="Project Name"
          type="text"
          onChange={(e) => setProject({ ...project, title: e.target.value })}
        />
        <input
          placeholder="Description"
          type="text"
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />
        <input
          placeholder="Price"
          type="number"
          onChange={(e) =>
            setProject({ ...project, price: parseInt(e.target.value) })
          }
        />
        <input
          placeholder="Category"
          type="text"
          onChange={(e) => setProject({ ...project, category: e.target.value })}
        />
        <input
          placeholder="Location"
          type="text"
          onChange={(e) => setProject({ ...project, location: e.target.value })}
        />
        <input
          placeholder="Materials"
          type="text"
          onChange={(e) =>
            setProject({ ...project, materials: e.target.value.split(",") })
          }
        />
        <input
          placeholder="Height"
          type="number"
          onChange={(e) =>
            setProject({
              ...project,
              dimensions: {
                ...project.dimensions,
                height: parseInt(e.target.value),
              },
            })
          }
        />
        <input
          placeholder="Width"
          type="number"
          onChange={(e) =>
            setProject({
              ...project,
              dimensions: {
                ...project.dimensions,
                width: parseInt(e.target.value),
              },
            })
          }
        />
        <input
          placeholder="Depth"
          type="number"
          onChange={(e) =>
            setProject({
              ...project,
              dimensions: {
                ...project.dimensions,
                depth: parseInt(e.target.value),
              },
            })
          }
        />
        <input
          placeholder="Tags"
          type="text"
          onChange={(e) =>
            setProject({ ...project, tags: e.target.value.split(",") })
          }
        />
      </div>

      <button onClick={handleSubmit}>Create Project</button>
      <div className="">
        {projects.map((project: ProjectInterface) => (
          <Project key={project._id} {...project} />
        ))}
      </div>
    </div>
  );
}
