import './App.css';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { addTodo } from './features/todoSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function App() {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();

  // var cookieTodos = useSelector((state) => state.todos);

  useEffect(() => {
    if (Cookies.get('todos')) {
      setTodos(JSON.parse(Cookies.get('todos')));
    }
  }, []);

  useEffect(() => {}, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const onSubmit = (data) => {
    let obj = {
      id: Math.floor(Math.random() * 1000),
      todo: data.todo,
      done: false,
      date: new Date().toDateString(),
    };

    dispatch(addTodo(obj));
    setTodos([...todos, obj]);
    reset({ todo: '' });
  };

  const handleDone = (id) => {
    let cookies = JSON.parse(Cookies.get('todos'));
    let todo = cookies.find((todo) => todo.id === id);
    // flushSync(() => {
    //   let myTodo = todos.find((todo) => todo.id === id);

    //   if (myTodo.done) {

    //     myTodo.done = false;
    //   } else {
    //     myTodo.done = true;
    //   }
    //   setTodos((todos) =>
    //     todos.filter((todo) => parseInt(todo.id) !== parseInt(id))
    //   );

    //   setTodos((todos) => todos.push(myTodo));
    // });

    if (todo.done) {
      todo.done = false;
      let filteredCookies = cookies.filter((todo) => todo.id !== id);
      filteredCookies.push(todo);
      Cookies.set('todos', JSON.stringify(filteredCookies));
      window.location.reload();
    } else {
      const cookies = JSON.parse(Cookies.get('todos'));
      let todo = cookies.find((todo) => todo.id === id);
      todo.done = true;
      let filteredCookies = cookies.filter((todo) => todo.id !== id);
      filteredCookies.push(todo);
      Cookies.set('todos', JSON.stringify(filteredCookies));
      window.location.reload();
    }
  };

  const handleDelete = (id) => {
    let cookies = JSON.parse(Cookies.get('todos'));
    let filteredCookie = cookies.filter((todo) => todo.id !== id);
    Cookies.set('todos', JSON.stringify(filteredCookie));
    window.location.reload();
  };

  return (
    <div className="App p-4 overflow-hidden">
      <h1 className="text-white title text-center sm:text-lg md:text-4xl sm:mt-7 md:mt-5">
        My Todo ' s
      </h1>

      <div className="w-[45%] h-[85%] p-4 bg-slate-300 center-div rounded-2xl overflow-auto">
        <form className="flex flex-row gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            rules={{ required: true, minLength: 5, maxLength: 50 }}
            name="todo"
            control={control}
            render={({ field }) => (
              <TextField
                label="Write Your Todo"
                style={{ width: '80%' }}
                {...field}
              />
            )}
          />
          {errors.todo && (
            <span className="text-xs font-semibold text-red-600">
              At least 5 characters !
            </span>
          )}

          <button
            className="bg-red-300  tracking-widest transition-all duration-500 hover:scale-90 rounded-lg w-[20%] font-serif font-bold text-2xl"
            type="submit"
          >
            Add
          </button>
        </form>

        <p className="text-center mt-4 title text-4xl tracking-widest mb-4">
          Todos
        </p>

        {todos?.map((todo, i) => (
          <div
            className={`flex flex-row justify-between mb-1 items-center `}
            key={i}
          >
            <p
              className={`text-black text-xl font-mono ${
                todo.done ? 'line-through' : 'no-underline'
              } `}
            >
              {todo.todo}
            </p>
            <p className="text-black text-sm font-mono">{todo.date}</p>
            <div className="flex flex-row gap-6">
              {' '}
              <span
                onClick={(e) => handleDone(todo.id)}
                className="cursor-pointer hover:scale-90 transition-all ease-in-out duration-500 text-red-600"
              >
                {todo.done ? (
                  <span className="text-2xl">X</span>
                ) : (
                  <DoneOutlineIcon
                    style={{ fontSize: '35px', color: 'green' }}
                  />
                )}
              </span>
              <span
                onClick={(e) => handleDelete(todo.id)}
                className="cursor-pointer hover:scale-90 transition-all ease-in-out duration-500"
              >
                <DeleteIcon style={{ fontSize: '35px', color: 'darkred' }} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
