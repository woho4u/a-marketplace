"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Project from "./Components/Project";

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

export default function Home() {
   const [project, setProject] = useState<ProjectInterface>({
      _id: "",
      title: "",
      description: "",
      price: 0,
      category: "",
      creator: "",
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
            const response = await axios.get("http://localhost:3000/api/get-projects");
            setProjects(response.data.data);
         };
         fetchData();
      } catch (error) {
         console.error(error);
      }
   }, [newProject]);

   const handleSubmit = async () => {
      try {
         const response = await axios.post("http://localhost:3000/api/add-project", {
            project: project,
         });
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className="flex flex-col gap-5 p-12 items-center font-[family-name:var(--font-geist-sans)]">
         <div className="flex flex-col gap-1 h-80">
            <input
               placeholder="Project Name"
               type="text"
               onChange={(e) => setProject({ ...project, title: e.target.value })}
            />
            <input
               placeholder="Description"
               type="text"
               onChange={(e) => setProject({ ...project, description: e.target.value })}
            />
            <input
               placeholder="Price"
               type="number"
               onChange={(e) => setProject({ ...project, price: parseInt(e.target.value) })}
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
               onChange={(e) => setProject({ ...project, materials: e.target.value.split(",") })}
            />
            <input
               placeholder="Height"
               type="number"
               value={project.dimensions?.width || ""}
               onChange={(e) =>
                  setProject({
                     ...project,
                     dimensions: {
                        ...project.dimensions,
                        width: Number(e.target.value),
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
                     dimensions: { ...project.dimensions, width: parseInt(e.target.value) },
                  })
               }
            />
            <input
               placeholder="Depth"
               type="number"
               onChange={(e) =>
                  setProject({
                     ...project,
                     dimensions: { ...project.dimensions, depth: parseInt(e.target.value) },
                  })
               }
            />
            <input
               placeholder="Tags"
               type="text"
               onChange={(e) => setProject({ ...project, tags: e.target.value.split(",") })}
            />
         </div>

         <button onClick={() => setNewProject(!newProject)}>New Project</button>
         <div className="">
            {projects.map((project: ProjectInterface) => (
               <Project key={project._id} {...project} />
            ))}
         </div>
      </div>
   );
}
