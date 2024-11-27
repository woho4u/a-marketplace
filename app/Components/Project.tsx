import React from "react";
import { useEffect, useState } from "react";
interface Project {
   _id: string;
   title: string;
   description: string;
   price: number;
   category?: string;
   creator?: string;
   location?: string;
   materials?: string[];
   dimensions?: {
      height: number;
      width: number;
      depth: number;
   };
   available?: boolean;
   tags?: string[];
   dateCreated?: Date;
   ratings?: {
      average: number;
      reviews: string[];
   };
}

const Project = ({
   _id,
   title,
   description,
   price,
   category,
   creator,
   location,
   materials,
   dimensions,
   available,
   tags,
   dateCreated,
   ratings,
}: Project) => {
   return (
      <div className="w-1/2 px-2 py-6 h-40">
         <div className="rounded-lg bg-slate-50 h-full w-full">
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{price}$</p>
            <p>{_id}$</p>
            <p>{category}</p>
            <p>{creator}</p>
            <p>{location}</p>
            <p>{materials}</p>
            {dimensions && (
               <div>
                  <p>{dimensions.height}</p>
                  <p>{dimensions.width}</p>
                  <p>{dimensions.depth}</p>
               </div>
            )}
            <p>{available}</p>
            <p>{tags}</p>
            {ratings && (
               <div>
                  <p>{ratings.average}</p>
                  <p>{ratings.reviews}</p>
               </div>
            )}
         </div>
      </div>
   );
};
export default Project;
