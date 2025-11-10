import { useEffect, useState } from "react";
import axios from "axios";

export default function useDashboardStats() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [stats, setStats] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, weeklyRes] = await Promise.all([
          axios.get(`${API_URL}/api/stats/dashboard`),
          axios.get(`${API_URL}/api/stats/weekly-sales`)
        ]);
        setStats(statsRes.data.payload);
        setWeekly(weeklyRes.data.payload);
      } catch (err) {
        console.error("Error al obtener estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, weekly, loading };
}
