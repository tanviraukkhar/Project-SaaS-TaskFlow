import { useEffect, useMemo, useState } from "react";

import {
  FolderKanban,
  CheckCircle,
  Clock3,
  Search
} from "lucide-react";


import DashboardLayout from "../layouts/DashboardLayout";

import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";
import DeleteModal from "../components/DeleteModal";

import API from "../api/axios";


function Projects() {


  const [projects,setProjects] = useState([]);

  const [loading,setLoading] = useState(true);

  const [searchTerm,setSearchTerm] = useState("");

  const [statusFilter,setStatusFilter] = useState("All");


  const [isModalOpen,setIsModalOpen] = useState(false);

  const [editingProject,setEditingProject] = useState(null);


  const [isDeleteOpen,setIsDeleteOpen] = useState(false);

  const [deleteId,setDeleteId] = useState(null);


  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role?.toLowerCase() === "admin";





  const fetchProjects = async()=>{

    try{

      setLoading(true);

      const res = await API.get("/projects");

      setProjects(
        res.data.projects || []
      );


    }
    catch(error){

      console.log(
        error.response?.data?.message
      );

    }
    finally{

      setLoading(false);

    }

  };





  useEffect(()=>{

    fetchProjects();

  },[]);







  const handleSaveProject = async(projectData)=>{


    try{


      if(editingProject){


        await API.put(

          `/projects/${editingProject._id}`,

          projectData

        );


      }
      else{


        await API.post(

          "/projects",

          projectData

        );


      }



      fetchProjects();

      setIsModalOpen(false);

      setEditingProject(null);



    }
    catch(error){

      console.log(
        error.response?.data?.message
      );

    }


  };








  const handleDeleteProject = async()=>{


    try{


      await API.delete(

        `/projects/${deleteId}`

      );


      fetchProjects();


      setDeleteId(null);

      setIsDeleteOpen(false);



    }
    catch(error){


      console.log(
        error.response?.data?.message
      );


    }


  };









  const filteredProjects = useMemo(()=>{


    return projects.filter((project)=>{


      const search =
      searchTerm.toLowerCase();



      const matchSearch =

        project.title
        ?.toLowerCase()
        .includes(search)

        ||

        project.description
        ?.toLowerCase()
        .includes(search);



      const matchStatus =

        statusFilter === "All"

        ||

        project.status === statusFilter;



      return matchSearch && matchStatus;


    });


  },[
    projects,
    searchTerm,
    statusFilter
  ]);








  const totalProjects = projects.length;


  const completedProjects =
    projects.filter(
      p=>p.status==="Completed"
    ).length;



  const runningProjects =
    projects.filter(
      p=>p.status==="In Progress"
    ).length;










return (

<DashboardLayout>


<div className="space-y-8">






{/* Header */}


<div
className="
relative
overflow-hidden
rounded-3xl
bg-slate-950
p-8
text-white
shadow-xl
"
>


<div>


<h1 className="
text-3xl
font-bold
">

Projects

</h1>



<p className="
mt-2
text-slate-300
">

Manage, track and organize your team projects.

</p>




{
isAdmin &&

<button

onClick={()=>{

setEditingProject(null);

setIsModalOpen(true);

}}

className="
mt-5
bg-white/10
border
border-white/20
text-white
px-5
py-3
rounded-xl
font-semibold
backdrop-blur
hover:bg-white/20
transition
"

>

+ Create Project

</button>

}



</div>


</div>









{/* Stats */}


<div className="
grid
sm:grid-cols-3
gap-5
">


<div className="
bg-white
dark:bg-slate-900
rounded-3xl
p-5
shadow
border
dark:border-slate-800
">

<FolderKanban className="text-slate-700 dark:text-white"/>


<p className="text-gray-500 mt-3">

Total Projects

</p>


<h2 className="
text-3xl
font-bold
dark:text-white
">

{totalProjects}

</h2>


</div>






<div className="
bg-white
dark:bg-slate-900
rounded-3xl
p-5
shadow
border
dark:border-slate-800
">


<Clock3 className="text-slate-700 dark:text-white"/>


<p className="text-gray-500 mt-3">

Running

</p>


<h2 className="
text-3xl
font-bold
dark:text-white
">

{runningProjects}

</h2>


</div>






<div className="
bg-white
dark:bg-slate-900
rounded-3xl
p-5
shadow
border
dark:border-slate-800
">


<CheckCircle className="text-slate-700 dark:text-white"/>


<p className="text-gray-500 mt-3">

Completed

</p>


<h2 className="
text-3xl
font-bold
dark:text-white
">

{completedProjects}

</h2>


</div>


</div>









{/* Search */}


<div className="
bg-white
dark:bg-slate-900
rounded-3xl
p-5
shadow
border
dark:border-slate-800
grid
md:grid-cols-2
gap-4
">


<div className="relative">


<Search
className="
absolute
left-4
top-3.5
text-gray-400
"
size={20}
/>



<input

value={searchTerm}

onChange={
e=>setSearchTerm(e.target.value)
}


placeholder="Search projects..."


className="
w-full
pl-12
py-3
rounded-xl
border
bg-gray-50
dark:bg-slate-800
dark:text-white
"

/>


</div>





<select

value={statusFilter}

onChange={
e=>setStatusFilter(e.target.value)
}


className="
rounded-xl
border
px-4
bg-gray-50
dark:bg-slate-800
dark:text-white
"

>


<option>All</option>

<option>Planning</option>

<option>In Progress</option>

<option>Completed</option>


</select>



</div>









{
loading ?

<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
">


{
[1,2,3].map(i=>(

<div
key={i}
className="
h-72
bg-gray-200
dark:bg-slate-800
rounded-3xl
animate-pulse
"
/>

))
}


</div>


:


filteredProjects.length > 0 ?


<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
">


{
filteredProjects.map(project=>(


<ProjectCard

key={project._id}

project={project}


onEdit={()=>{

setEditingProject(project);

setIsModalOpen(true);

}}



onDelete={()=>{

setDeleteId(project._id);

setIsDeleteOpen(true);

}}


/>


))
}


</div>


:


<div className="
text-center
py-20
bg-white
dark:bg-slate-900
rounded-3xl
">


<h2 className="
text-2xl
font-bold
dark:text-white
">

No Projects Found

</h2>


<p className="text-gray-500 mt-2">

Create your first project to get started.

</p>


</div>


}








<CreateProjectModal

isOpen={isModalOpen}


onClose={()=>{

setIsModalOpen(false);

setEditingProject(null);

}}


onSave={handleSaveProject}


project={editingProject}


/>







<DeleteModal

isOpen={isDeleteOpen}


onClose={()=>{

setDeleteId(null);

setIsDeleteOpen(false);

}}


onConfirm={handleDeleteProject}


/>






</div>


</DashboardLayout>

);


}


export default Projects;
