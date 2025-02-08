"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Trash2, CheckCircle, Pencil } from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const API_URL = "/api/tasks";

export default function NotesApp() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "", dueDate: "", completed: false, priority: "medium" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setLoading(false);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to load notes");
    }
  };

  const handleSave = async () => {
    try {
      if (!newNote.title.trim()) {
        toast.error("Title is required");
        return;
      }

      const method = editId ? "PUT" : "POST";
      const url = editId ? API_URL : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { id: editId, ...newNote } : newNote),
      });

      if (!response.ok) throw new Error(`Failed to ${editId ? "update" : "add"} task`);

      const result = await response.json();
      setNotes((prevNotes) =>
        editId
          ? prevNotes.map((note) => (note._id === editId ? result : note))
          : [...prevNotes, result]
      );

      toast.success(`Note ${editId ? "updated" : "added"} successfully!`);
      setNewNote({ title: "", description: "", dueDate: "", completed: false, priority: "medium" });
      setEditId(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save note");
    }
  };

  const editNote = (note) => {
    setNewNote(note);
    setEditId(note._id);
    setIsDialogOpen(true);
  };

  const toggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task._id, completed: !task.completed }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedFromDB = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((t) => (t._id === updatedFromDB._id ? updatedFromDB : t))
      );

      toast.success(`Task marked as ${updatedFromDB.completed ? "Completed" : "Pending"}!`);
    } catch (error) {
      console.error("Error toggling completion:", error);
      toast.error("Failed to update task.");
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(API_URL, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("task deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };

  const removeAllNotes = async () => {
    try {
      await fetch(API_URL, { method: "DELETE" });
      setNotes([]);
      toast.success("All Task removed!");
    } catch (error) {
      console.error("Error deleting all notes:", error);
    }
  };

  const filteredNotes = notes
    .filter((note) => (filter === "pending" ? !note.completed : filter === "completed" ? note.completed : true))
    .filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const colors = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-pink-200", "bg-purple-200"];

  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster position="top-right" />

     
      <Sidebar  className="w-64 bg-gray-900 text-black">
        <SidebarHeader>
          <h1 className="text-2xl font-semibold my-10 text-center">Task Manager</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Filters</SidebarGroupLabel>
            <SidebarMenu>
              
              {["all", "pending", "completed"].map((item) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuButton onClick={() => setFilter(item)}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={removeAllNotes} className="text-red-500">
                  <Trash2 className="w-5 h-5" /> Remove All
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {loading ? (
        
          <h1>Loading.....</h1>
        
      ):(
        //Main Content
      <div className="flex  p-6 bg-white relative ">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>

       
        <div className="flex items-center mb-4 space-x-2">
          <Input type="text" placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredNotes.map((note, index) => (
    <div key={note._id} className={`flex flex-col p-4 rounded-lg shadow-md ${colors[index % colors.length]}`}>
      
      <div className="flex-grow">
        <p className="text-lg font-semibold">{note.title}</p>
        <p className="text-sm text-gray-700 mt-2">{note.description}</p>
        <p className="text-sm text-gray-700 mt-2">Due: {new Date(note.dueDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-700 mt-2">Priority: {note.priority}</p>
      </div>

     
      <div className="flex space-x-2 md:flex-wrap md:gap-2 md:justify-center mt-4">
        <Button onClick={() => editNote(note)}>Edit</Button>
        <Button onClick={() => deleteNote(note._id)}>Delete</Button>
        <Button onClick={() => toggleComplete(note)}>
          {note.completed ? "Mark as Pending" : "Mark as Completed"}
        </Button>
      </div>
    </div>
  ))}
</div>

       
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="fixed bottom-8 right-8 rounded-full w-14 h-14">
              <Plus className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Note" : "Add New Note"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={newNote.description}
                onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
              />
              <Input
                type="date"
                value={newNote.dueDate}
                onChange={(e) => setNewNote({ ...newNote, dueDate: e.target.value })}
              />
              <Select
                value={newNote.priority}
                onValueChange={(value) => setNewNote({ ...newNote, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
      )}

      
    </div>
  );
}