import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  DialogActions,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import { Home, SportsEsports, Article, TravelExplore, Info, Login, AttachMoney, ShoppingCart, Savings } from "@mui/icons-material";
import { Pie, Bar } from "react-chartjs-2";
import 'chart.js/auto';

        const FinanceTracker = () => {
        const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));

        const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());


        const totalIncome = 5000;
        const totalExpenses = 3500;
        const savings = totalIncome - totalExpenses;
        const investmentMoney = 1000;
        const expectedValues = {
            income: 5500,
            expenses: 3000,
            bills: 1200,
            savings: 1500,
            investment: 1200,
            debt: 500
        };
        const actualValues = {
            income: totalIncome,
            expenses: totalExpenses,
            bills: 1300,
            savings: savings,
            investment: investmentMoney,
            debt: 700
        };

        const pieData = {
            labels: ['Savings', 'Total Income'],
            datasets: [
            {
                data: [savings, totalIncome],
                backgroundColor: ['#4caf50', '#6a0dad'],
            },
            ],
        };

        const barData = {
            labels: ["Income", "Expenses", "Bills", "Savings", "Investment", "Debt"],
            datasets: [
            {
                label: "Actual",
                data: Object.values(actualValues),
                backgroundColor: "#4caf50",
            },
            {
                label: "Expected",
                data: Object.values(expectedValues),
                backgroundColor: "#c2185b",
            }
            ],
        };

        const handleDateClick = (date) => {
            setSelectedDate(date);
            setDialogOpen(true);
          };
        
          const handleNoteSave = () => {
            setDialogOpen(false);
          };
        
          const handleMonthChange = (event) => {
            setCurrentMonth(event.target.value);
          };
        
          const handleYearChange = (event) => {
            setCurrentYear(event.target.value);
          };
        
          const getDaysInMonth = (month, year) => {
            return new Date(year, month + 1, 0).getDate();
          };
          const renderCalendar = () => {
            const daysInMonth = getDaysInMonth(currentMonth, currentYear);
            const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
            const calendarDays = [];
        
            // Fill the calendar with empty cells for days before the first day of the month
            for (let i = 0; i < firstDayOfMonth; i++) {
              calendarDays.push(<td key={`empty-${i}`}></td>);
            }
        
            // Fill the calendar with the days of the month
            for (let day = 1; day <= daysInMonth; day++) {
              calendarDays.push(
                <td
                  key={day}
                  style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}
                >
                  <Button onClick={() => handleDateClick(day)}>{day}</Button>
                </td>
              );
            }
        
            // Split the days into weeks
            const weeks = [];
            while (calendarDays.length > 0) {
              weeks.push(<tr key={weeks.length}>{calendarDays.splice(0, 7)}</tr>);
            }
        
            return weeks;
          };

        return (
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "linear-gradient(135deg, #5e3967, #351742)",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: 5,
                }}
            >
                <AppBar
                    position="fixed"
                    sx={{
                        top: 15,
                        left: "5%",
                        width: "90%",
                        backgroundColor: "#331540",
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0",
                        borderRadius: "100px",
                        height: "10%",
                    }}
                >
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
                        <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
                            Finance Quest
                        </Typography>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <IconButton component={Link} to="/" sx={{ color: "#fff" }}><Home /></IconButton>
                            <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}><SportsEsports /></IconButton>
                            <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}><Article /></IconButton>
                            <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}><TravelExplore /></IconButton>
                            <IconButton component={Link} to="/about" sx={{ color: "#fff" }}><Info /></IconButton>
                            <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}><Login /></IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 12, gap: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", color: "#fff", mt: 10 }}>
                        Monthly Budget Overview
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem", fontFamily: "'Lilita One'", color: "#fff", textAlign: "center" }}>
                        Track your income, expenses, and savings with ease.
                    </Typography>
                </Box>

                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 1400,
                        mx: "auto",
                        mt: 8,
                        p: 4,
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 3,
                        flexDirection: { xs: "column", md: "row" },
                        mb: 6,
                    }}
                >
                    <Box sx={{ flex: 1, fontFamily: "'Lilita One'", pr: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                fontSize: "5.5rem",
                                color: "#5e3967",
                                fontFamily: "'Lilita One'",
                                position: "relative",
                                display: "inline-block",
                                textShadow: "2px 2px 0px #ffffff, 4px 4px 0px #c2b5dd",
                            }}
                        >
                            {selectedMonth}
                            <Box
                                component="span"
                                sx={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-25px",
                                    fontSize: "0.7em",
                                    color: "#c2b5dd",
                                }}
                            >
                            </Box>

                            <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography variant="h6" sx={{ color: "#5e3967" }}>
                                    Select Month:
                                </Typography>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    style={{
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #5e3967",
                                        fontFamily: "'Lilita One'",
                                        fontSize: "1rem",
                                        color: "#5e3967",
                                        backgroundColor: "#f3e5f5",
                                    }}
                                >
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </Box>
                            <Divider sx={{ my: 5 }} />
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#5e3967" }} gutterBottom>
                            Income & Expenses Breakdown
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: "text.secondary" }} gutterBottom>
                            See where your money goes every month and make smarter financial decisions.
                        </Typography>
                        <Divider sx={{ my: 5 }} />
                        {[
                            { label: "Total Income", amount: totalIncome, color: "#6a0dad", icon: <AttachMoney fontSize="large" /> },
                            { label: "Total Expenses", amount: totalExpenses, color: "#c2185b", icon: <ShoppingCart fontSize="large" /> },
                            { label: "Savings", amount: savings, color: "#4caf50", icon: <Savings fontSize="large" /> }
                        ].map((item, index) => (
                            <Paper
                                key={index}
                                elevation={3}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 2,
                                    my: 2,
                                    borderRadius: 5,
                                    backgroundColor: "#f3e5f5",
                                    width: "100%",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    {item.icon}
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: item.color }}>
                                            {item.label}: ${item.amount}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={item.label === "Total Expenses" ? (totalExpenses / totalIncome) * 100 : (item.label === "Savings" ? (savings / totalIncome) * 100 : 100)}
                                            sx={{ width: "100%", height: 8, borderRadius: 2, bgcolor: "#d1c4e9" }}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: "#5e3967" }} />
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "row", gap: 4 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967", mb: 2 }}>
                                Monthly Saving Rate
                            </Typography>
                            <Box sx={{ maxWidth: 350, mx: "auto" }}>
                                <Pie data={pieData} options={{ maintainAspectRatio: false }} width={300} height={300} />
                            </Box>
                            <Divider sx={{ my: 5 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967", mt: 4, mb: 2 }}>
                                Actual vs Expected Finances
                            </Typography>
                            <Box sx={{ maxWidth: 350, mx: "auto" }}>
                                <Bar data={barData} options={{ maintainAspectRatio: false }} width={300} height={300} />
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: "#5e3967" }} />
                        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967", mb: 2 }}>
                                    Expenses Summary
                                </Typography>
                                <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Category</th>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Expected</th>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Actual</th>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Include</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Grocery</td>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>${expectedValues.income}</td>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>${actualValues.income}</td>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}><input type="checkbox"/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Paper>
                                <Divider sx={{ my: 5 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967", mb: 2 }}>
                                    Bills Summary
                                </Typography>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Category</th>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Expected</th>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Actual</th>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Due</th>
                                                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Include</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Electric</td>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>${expectedValues.expenses}</td>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>${actualValues.expenses}</td>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>14</td>
                                                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}><input type="checkbox"/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Paper>
                                <Divider sx={{ my: 5 }} />
    <Paper
        elevation={3}
        sx={{
          maxWidth: 1400,
          mx: "auto",
          p: 4,
          display: "flex",
          alignItems: "center",
          borderRadius: 3,
          flexDirection: { xs: "column", md: "row" },
          mb: 6,
          mt: 5,
        }}
      >
        
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967", mb: 2 }}>
            Calendar
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Button onClick={() => setDialogOpen(true)}>Open Calendar</Button>
          </Paper>
        </Box>
      </Paper>
{/* Calendar Dialog */}
<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Calendar</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Left Side: Today's Date, Month/Year Selection */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Today: {new Date().toLocaleDateString()}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">Select Month:</Typography>
                <Select value={currentMonth} onChange={handleMonthChange} fullWidth>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <MenuItem key={index} value={index}>
                      {new Date(0, index).toLocaleString("default", { month: "long" })}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">Select Year:</Typography>
                <Select value={currentYear} onChange={handleYearChange} fullWidth>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <MenuItem key={index} value={new Date().getFullYear() - 5 + index}>
                      {new Date().getFullYear() - 5 + index}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            {/* Right Side: Calendar */}
            <Box sx={{ flex: 2 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <th key={day} style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>{renderCalendar()}</tbody>
              </table>
            </Box>
          </Box>

          {/* Note Section */}
          {selectedDate && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">Notes for {selectedDate}</Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                value={notes[selectedDate] || ""}
                onChange={(e) => setNotes({ ...notes, [selectedDate]: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleNoteSave}>Save</Button>
        </DialogActions>
      </Dialog>



                                {/* <Divider sx={{ my: 5 }} /> */}
                                {/* <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967", mb: 2 }}>
                                        Calendar
                                    </Typography>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                                        <th key={day} style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{day}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from({ length: 5 }).map((_, weekIndex) => (
                                                    <tr key={weekIndex}>
                                                        {Array.from({ length: 7 }).map((_, dayIndex) => (
                                                            <td key={dayIndex} style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                                                                {weekIndex * 7 + dayIndex + 1 <= 30 ? weekIndex * 7 + dayIndex + 1 : ""}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Paper>
                                </Box> */}
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        );
        };

        export default FinanceTracker;


