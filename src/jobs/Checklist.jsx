import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiCalendar, FiFlag, FiCheck, FiFilter } from 'react-icons/fi';

const Checklist = () => {
  // State for checklist items
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('checklist-items');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        text: 'Complete project proposal',
        checked: false,
        dueDate: '2023-12-15',
        priority: 'medium',
        category: 'work',
        notes: 'Need to include budget section'
      },
      {
        id: 2,
        text: 'Grocery shopping',
        checked: false,
        dueDate: '2023-12-10',
        priority: 'high',
        category: 'personal',
        notes: 'Milk, eggs, bread, fruits'
      },
      {
        id: 3,
        text: 'Review code changes',
        checked: true,
        dueDate: '',
        priority: 'low',
        category: 'work',
        notes: 'Check PR #42'
      },
      {
        id: 4,
        text: 'Morning workout',
        checked: false,
        dueDate: '',
        priority: 'medium',
        category: 'health',
        notes: '30 minutes cardio'
      }
    ];
  });

  // Form states
  const [newItemText, setNewItemText] = useState('');
  const [newItemDueDate, setNewItemDueDate] = useState('');
  const [newItemPriority, setNewItemPriority] = useState('medium');
  const [newItemCategory, setNewItemCategory] = useState('work');
  const [newItemNotes, setNewItemNotes] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  
  // UI states
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('checklist-items', JSON.stringify(items));
  }, [items]);

  // Calculate statistics
  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const overdueCount = items.filter(item => 
    item.dueDate && !item.checked && new Date(item.dueDate) < new Date()
  ).length;

  // Filtered items based on active filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'completed' && item.checked) ||
                         (activeFilter === 'active' && !item.checked) ||
                         item.category === activeFilter ||
                         item.priority === activeFilter;
    return matchesSearch && matchesFilter && (showCompleted || !item.checked);
  });

  // CRUD Operations
  const addNewItem = () => {
    if (newItemText.trim() === '') return;
    
    const newItem = {
      id: Date.now(),
      text: newItemText,
      checked: false,
      dueDate: newItemDueDate,
      priority: newItemPriority,
      category: newItemCategory,
      notes: newItemNotes,
      createdAt: new Date().toISOString()
    };
    
    setItems([...items, newItem]);
    resetForm();
  };

  const updateItem = () => {
    if (!editingItem || newItemText.trim() === '') return;
    
    setItems(items.map(item => 
      item.id === editingItem.id ? {
        ...item,
        text: newItemText,
        dueDate: newItemDueDate,
        priority: newItemPriority,
        category: newItemCategory,
        notes: newItemNotes
      } : item
    ));
    
    setEditingItem(null);
    resetForm();
  };

  const toggleCheck = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setNewItemText(item.text);
    setNewItemDueDate(item.dueDate);
    setNewItemPriority(item.priority);
    setNewItemCategory(item.category);
    setNewItemNotes(item.notes);
  };

  const resetForm = () => {
    setNewItemText('');
    setNewItemDueDate('');
    setNewItemPriority('medium');
    setNewItemCategory('work');
    setNewItemNotes('');
  };

  // Priority and category options
  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  const categoryOptions = [
    { value: 'work', label: 'Work', color: 'bg-purple-100 text-purple-800' },
    { value: 'personal', label: 'Personal', color: 'bg-green-100 text-green-800' },
    { value: 'health', label: 'Health', color: 'bg-blue-100 text-blue-800' },
    { value: 'shopping', label: 'Shopping', color: 'bg-orange-100 text-orange-800' },
    { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Productivity Checklist</h1>
        <p className="text-gray-600">Organize your tasks and boost your productivity</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
          <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          <p className="text-2xl font-bold text-green-600">{completedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Progress</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Overdue</h3>
          <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                className="appearance-none bg-white pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
                <option value="high">High Priority</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
              </select>
              <FiFilter className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
            </div>
            
            <button 
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              {viewMode === 'list' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Item Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingItem ? 'Edit Task' : 'Add New Task'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Name*</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What needs to be done?"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItemDueDate}
                onChange={(e) => setNewItemDueDate(e.target.value)}
              />
              <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <div className="flex space-x-2">
              {priorityOptions.map(option => (
                <button
                  key={option.value}
                  className={`px-3 py-1.5 rounded-lg border ${newItemPriority === option.value ? 
                    `${option.color} border-transparent` : 'bg-white border-gray-300'}`}
                  onClick={() => setNewItemPriority(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div className="flex space-x-2">
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  className={`px-3 py-1.5 rounded-lg border ${newItemCategory === option.value ? 
                    `${option.color} border-transparent` : 'bg-white border-gray-300'}`}
                  onClick={() => setNewItemCategory(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Additional details..."
            value={newItemNotes}
            onChange={(e) => setNewItemNotes(e.target.value)}
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3">
          {editingItem && (
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setEditingItem(null);
                resetForm();
              }}
            >
              Cancel
            </button>
          )}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={editingItem ? updateItem : addNewItem}
          >
            {editingItem ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeFilter === 'all' ? 'All Tasks' : 
             activeFilter === 'completed' ? 'Completed Tasks' :
             activeFilter === 'active' ? 'Active Tasks' :
             activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
          </h2>
          <div className="flex items-center">
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
              />
              <span className="ml-2 text-sm text-gray-600">Show completed</span>
            </label>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className={`bg-white p-4 rounded-lg shadow-sm border ${item.checked ? 'border-green-200 bg-green-50' : 'border-gray-200'} ${item.dueDate && new Date(item.dueDate) < new Date() && !item.checked ? 'border-red-200 bg-red-50' : ''}`}
              >
                <div className="flex items-start">
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className={`mt-1 flex-shrink-0 h-5 w-5 rounded border ${item.checked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                  >
                    {item.checked && <FiCheck className="h-4 w-4 mx-auto" />}
                  </button>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-gray-800 ${item.checked ? 'line-through text-gray-500' : ''}`}>
                        {item.text}
                      </p>
                      <div className="flex space-x-2">
                        {item.priority === 'high' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            High
                          </span>
                        )}
                        {item.priority === 'medium' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Medium
                          </span>
                        )}
                        {item.priority === 'low' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Low
                          </span>
                        )}
                        
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          item.category === 'work' ? 'bg-purple-100 text-purple-800' :
                          item.category === 'personal' ? 'bg-green-100 text-green-800' :
                          item.category === 'health' ? 'bg-blue-100 text-blue-800' :
                          item.category === 'shopping' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    {item.dueDate && (
                      <div className={`mt-1 flex items-center text-sm ${new Date(item.dueDate) < new Date() && !item.checked ? 'text-red-600' : 'text-gray-500'}`}>
                        <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                        Due {new Date(item.dueDate).toLocaleDateString()}
                        {new Date(item.dueDate) < new Date() && !item.checked && (
                          <span className="ml-2 font-medium">(Overdue)</span>
                        )}
                      </div>
                    )}
                    
                    {item.notes && (
                      <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {item.notes}
                      </div>
                    )}
                    
                    <div className="mt-3 flex justify-end space-x-2">
                      <button
                        onClick={() => startEditing(item)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiEdit2 className="mr-1.5 h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <FiTrash2 className="mr-1.5 h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className={`bg-white p-4 rounded-lg shadow-sm border ${item.checked ? 'border-green-200 bg-green-50' : 'border-gray-200'} ${item.dueDate && new Date(item.dueDate) < new Date() && !item.checked ? 'border-red-200 bg-red-50' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className={`flex-shrink-0 h-5 w-5 rounded border ${item.checked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                  >
                    {item.checked && <FiCheck className="h-4 w-4 mx-auto" />}
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(item)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className={`text-lg font-medium mb-2 ${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {item.text}
                </h3>
                
                {item.dueDate && (
                  <div className={`mb-2 flex items-center text-sm ${new Date(item.dueDate) < new Date() && !item.checked ? 'text-red-600' : 'text-gray-500'}`}>
                    <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    Due {new Date(item.dueDate).toLocaleDateString()}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                  </span>
                  
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    item.category === 'work' ? 'bg-purple-100 text-purple-800' :
                    item.category === 'personal' ? 'bg-green-100 text-green-800' :
                    item.category === 'health' ? 'bg-blue-100 text-blue-800' :
                    item.category === 'shopping' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                </div>
                
                {item.notes && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {item.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Checklist Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-medium text-blue-700 mb-2">Prioritize Your Tasks</h3>
            <p className="text-sm text-gray-600">Use the priority levels to focus on what's most important. Tackle high-priority items first when your energy is highest.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-medium text-blue-700 mb-2">Set Realistic Due Dates</h3>
            <p className="text-sm text-gray-600">Assign deadlines to create accountability, but make sure they're achievable to avoid unnecessary stress.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-medium text-blue-700 mb-2">Use Categories</h3>
            <p className="text-sm text-gray-600">Organize tasks by category to maintain balance between different areas of your life (work, personal, health).</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="font-medium text-blue-700 mb-2">Review Regularly</h3>
            <p className="text-sm text-gray-600">Schedule time each week to review and update your checklist, celebrating completed items and adjusting priorities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;