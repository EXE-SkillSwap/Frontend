import React, { useState, useEffect } from "react";
import { participantsTableColumns } from "@/generator/generic-table-columns";
import GenericTable from "@/generator/generic-table-components";

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch participants data
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      // const response = await getParticipants();
      // setParticipants(response.data);

      // Mock data
      setParticipants([
        {
          id: 1,
          user: {
            firstName: "Nguyễn",
            lastName: "Văn A",
            email: "nguyenvana@example.com",
            username: "nguyenvana",
            avatarUrl: null,
          },
          status: "ACTIVE",
          joinedAt: "2024-01-15T10:30:00Z",
        },
        // More data...
      ]);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Danh sách người tham gia</h1>
        <p className="text-muted-foreground">
          Quản lý những người tham gia khóa học
        </p>
      </div>

      <GenericTable
        data={participants}
        columns={participantsTableColumns}
        searchPlaceholder="Tìm kiếm người tham gia..."
        loading={loading}
      />
    </div>
  );
};

export default ParticipantsPage;
