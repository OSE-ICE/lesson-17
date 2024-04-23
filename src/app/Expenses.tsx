import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import React, { useContext } from "react";
import { AdminRightsContext } from "./AdminContext";

type Expense = {
  id: number;
  name: string;
  cost: number;
};

const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/expenses");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log(response);
  return response;
};

const addExpense = async (expense: Expense): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/create-expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!res.ok) {
    throw new Error("Failed to add expense");
  }

  const response = await res.json();
  console.log(response);
  return response;
};

const deleteExpense = async (id: number): Promise<Expense[]> => {
  const res = await fetch(`http://localhost:3001/api/delete-expense/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete expense");
  }

  const response = await res.json();
  console.log(response);
  return response;
};

const Expenses = () => {
  const isAdminMode = useContext(AdminRightsContext);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const fetchExpenses = async () => {
    const fetchedExpenses = await getExpenses();
    setExpenses(fetchedExpenses);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addExpense({
      name,
      cost: Number(cost),
      id: 0,
    });
    setName("");
    setCost("");
    fetchExpenses();
  };

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (!expenses.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Expense name"
            required
          />
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Cost"
            required
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>
      <div className="expenses-container">
        {expenses.map((expense) => (
          <div className="expense-container" key={expense.id}>
            {isAdminMode && (
              <button
                className="delete-button"
                onClick={() => handleDelete(expense.id)}
              >
                X
              </button>
            )}
            <h2>{expense.name}</h2>
            <p>Cost: {expense.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;
