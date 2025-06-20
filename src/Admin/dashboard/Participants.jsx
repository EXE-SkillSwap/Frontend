import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

// Mock data
const mockParticipants = [
  {
    id: "00001",
    name: "Nguyen Ha Van Anh",
    address: "099 Kuch Green Apt. 448",
    date: "04 Sep 2024",
    lesson: "Spring & React",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Bui Viet Quy",
    address: "978 Immanuel Ferry Suite 526",
    date: "28 May 2024",
    lesson: "C# & Angular",
    status: "Studying",
  },
  {
    id: "00003",
    name: "Tran Duy Nhat",
    address: "8047 Fiske Parks",
    date: "23 Nov 2024",
    lesson: "Spring Boot 3",
    status: "Applied",
  },
  {
    id: "00004",
    name: "Nguyen Giang Phu",
    address: "768 Gusilar Lake Suite 656",
    date: "05 Feb 2024",
    lesson: "SAP",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Ben Loving",
    address: "042 Mylene Throughway",
    date: "29 Jul 2024",
    lesson: "Git & Github",
    status: "Studying",
  },
  {
    id: "00006",
    name: "Ashraf Murray",
    address: "144 Wisemann Mountain",
    date: "13 Aug 2024",
    lesson: "Javascript Tutorials",
    status: "Completed",
  },
  {
    id: "00007",
    name: "Maggie Sullivan",
    address: "New Southburg",
    date: "21 Dec 2024",
    lesson: "Networking",
    status: "Studying",
  },
  {
    id: "00008",
    name: "Brian Todd",
    address: "New Jon",
    date: "30 Apr 2024",
    lesson: "SAP",
    status: "Completed",
  },
  {
    id: "00009",
    name: "Dellie Hines",
    address: "124 Vela Purple Suite 576",
    date: "09 Jan 2024",
    lesson: "SAP",
    status: "Completed",
  },
];

export default function Participants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter participants based on search and filters
  const filteredParticipants = mockParticipants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate =
      selectedDate === "all" ||
      !selectedDate ||
      participant.date.includes(selectedDate);
    const matchesLesson =
      selectedLesson === "all" ||
      !selectedLesson ||
      participant.lesson === selectedLesson;
    const matchesStatus =
      selectedStatus === "all" ||
      !selectedStatus ||
      participant.status === selectedStatus;

    return matchesSearch && matchesDate && matchesLesson && matchesStatus;
  });

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDate("");
    setSelectedLesson("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  // Get unique lessons and statuses for filter options
  const uniqueLessons = [...new Set(mockParticipants.map((p) => p.lesson))];
  const uniqueStatuses = [...new Set(mockParticipants.map((p) => p.status))];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 space-y-4 p-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Participants</h1>
          </div>
          {/* Filters Section */}
          <div className="flex flex-wrap items-center gap-4 border-b pb-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="search" className="text-sm font-medium">
                Filter By
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Date</Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-40 cursor-pointer">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All dates</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="Sep 2024">Sep 2024</SelectItem>
                  <SelectItem value="May 2024">May 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Lesson</Label>
              <Select value={selectedLesson} onValueChange={setSelectedLesson}>
                <SelectTrigger className="w-48 cursor-pointer">
                  <SelectValue placeholder="Select lesson" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All lessons</SelectItem>
                  {uniqueLessons.map((lesson) => (
                    <SelectItem key={lesson} value={lesson}>
                      {lesson}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32 cursor-pointer">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            >
              Reset Filter
            </Button>
          </div>
          {/* Table Section */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>ADDRESS</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>LESSON</TableHead>
                  <TableHead>STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">
                      {participant.id}
                    </TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {participant.address}
                    </TableCell>
                    <TableCell>{participant.date}</TableCell>
                    <TableCell>{participant.lesson}</TableCell>
                    <TableCell>
                      <StatusBadge status={participant.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredParticipants.length)}{" "}
              of {filteredParticipants.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 cursor-pointer" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 cursor-pointer" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    Completed: "bg-green-100 text-green-800",
    Studying: "bg-yellow-100 text-yellow-800",
    Applied: "bg-blue-100 text-blue-800",
  };

  return (
    <Badge className={statusStyles[status] || "bg-gray-100 text-gray-800"}>
      {status}
    </Badge>
  );
}
