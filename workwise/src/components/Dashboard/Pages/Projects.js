import React from 'react'
import Project from './Project'
import axios from "axios";
import { useEffect, useState } from "react";

export default function Projects() {

	const [projects, setProjects] = useState([]);

	const getProjects = async () => {
		const res = await axios
		  .get("http://localhost:3001/api/v1/projects/cards", {
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
			},
		  });
		console.log(res.data.projects);
		setProjects(res.data.projects);
	};

	useEffect(() => {
		getProjects();
	}, []);
	
  return (
	<>
		{projects?.map((project) => (
			<Project key={project.id} project={project} />
		))}
	</>
  )
}
