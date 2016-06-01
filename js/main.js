$(document).ready(function() {
    
    // AddTask Event
    $('#add-task-form').on('submit',function(e){
        addTask(e);
      });
    
    // Edit task Event
    $('#edit-task-form').on('submit',function(e){
       updateTask(e); 
    });
    
    // Delete task Event
    $('#task-table').on('click','#remove-task',function(){
        id = $(this).data('id');
        removeTask(id);
    });
    
    // Clear All tasks Event
    $('#task-clear-all').on('click', function(){
        clearAllTasks();
    });
    
    //display all the tasks on page load
    displayTasks();
    
    //Function to display the tasks
    function displayTasks()
    {
        //get all the tasks which is a JSON
        var taskList = JSON.parse(localStorage.getItem('tasks'));
        
        //display task in sorted order
        if(taskList != null)
        {
            taskList = taskList.sort(sortByTime);
        }
        
        //loop through each task and display accordingly by sorting
        var i = 0;
        //check tasks
        if (localStorage.getItem('tasks') != null)
        {
            //for each task in taskList do
            $.each(taskList, function(key, value){
                $('#task-table').append('<tr id="' + value.id +'">' +
                                        '<td>' + value.task + '</td>'+
                                        '<td>' + value.task_priority + '</td>'+
                                        '<td>' + value.task_date + '</td>'+
                                        '<td>' + value.task_time + '</td>'+
                                        '<td> <a href="edit.html?id=' + value.id + '">Edit</a> | <a href="#" id="remove-task" data-id="' + value.id +'">Remove</a></td>'+
                                        '</tr>');
            })
        }
        
        //Function to sort Tasks
        function sortByTime(a, b)
        {
            var aTime =  a.task_time;
            var bTime = b.task_time;
            
            return((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
        } // sort ends
        
    } //func displayTasks ends
    
    
    //Function to add a Task
    function addTask(e)
    {
        
        //get the Unique value i.e. the timestamp
        var newDate = new Date();
        id = newDate.getTime();
        
        //fetch the other elements from the HTML page using their ID's
        var task = $('#task').val();
        var task_priority = $('#priority').val();
        var task_date = $('#date').val();
        var task_time = $('#time').val();
        
        //Adding Simple Validation
        if(task == '')
        {
            alert("Task field is required")
            e.preventDefault();
        }
        else if(task_date == '')
        {
            alert("Please Select Date")
            e.preventDefault();
        }
        else if(task_time == '')
        {
            alert("Please select Time")
            e.preventDefault();
        }
        else
        {
            //get the tasks
            tasks = JSON.parse(localStorage.getItem('tasks'));
            
            //check if null
            if (tasks == null)
            {
                tasks = [];
            }
            
            //Create a task list
            //var taskList = JSON.parse(localStorage.getItem('tasks'));
            
            //New Task Object creation
            var newTask = {
                "id": id,
                "task": task,
                "task_priority": task_priority,
                "task_date": task_date,
                "task_time": task_time
            }
            
            //push the task into tasks array
            tasks.push(newTask);
            
            //store it onto localstorage
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        
    }//add Task function ends
    
    //Function to update the changed task
    function updateTask(e)
    {
    
        //fetch all the values to be updated
        var id = $('#task-id').val();
        var task = $('#task').val();
        var task_priority = $('#priority').val();
        var task_date = $('#date').val();
        var task_time = $('#time').val();
        
        //fetch all the tasks
        taskList = JSON.parse(localStorage.getItem('tasks'));
        
        //find the task to edit using its ID
        for (var i=0;i<taskList.length;i++)
        {
            if (taskList[i].id == id)
            {
                taskList.splice(i,1);
            }
            localStorage.setItem('tasks',JSON.stringify(taskList));
        }
        
        
        //Adding Simple Validation
        if(task == '')
        {
            alert("Task field is required")
            e.preventDefault();
        }
        else if(task_date == '')
        {
            alert("Please Select Date")
            e.preventDefault();
        }
        else if(task_time == '')
        {
            alert("Please select Time")
            e.preventDefault();
        }
        else
        {
            //get the tasks
            tasks = JSON.parse(localStorage.getItem('tasks'));
            
            //check if null
            if (tasks == null){
                tasks = [];
            }
            
            //Create a task list
            //var taskList = JSON.parse(localStorage.getItem('tasks'));
            
            //New Task Object creation
            var newTask = {
                "id": id,
                "task": task,
                "task_priority": task_priority,
                "task_date": task_date,
                "task_time": task_time
            }
            
            //push the task into tasks array
            tasks.push(newTask);
            
            //store it onto localstorage
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        
    }// function update task ends
    
    //Function remove task
    function removeTask(id)
    {
        if(confirm("Are you sure you want to delete this task ?"))
        {
            //fetch all the tasks
            taskList = JSON.parse(localStorage.getItem('tasks'));
        
            //find the task to edit using its ID
            for (var i=0;i<taskList.length;i++)
            {
                if (taskList[i].id == id)
                {
                    taskList.splice(i,1);
                }
                localStorage.setItem('tasks',JSON.stringify(taskList));
            }

        }
        location.reload();
    }// function remove task ends
    
    //Function to clear all the tasks
    function clearAllTasks()
    {
        if(confirm("Are you sure you want to clear all tasks ?"))
        {      
            localStorage.clear();
        }
        location.reload();
    }
    
});

//Function to get a single task on pageLoad for edit task page
function getTask()
{
    var $_GET = getQueryParams(document.location.search);
    id = $_GET['id'];
    
    var taskList = JSON.parse(localStorage.getItem('tasks'));
    
    for (var i=0;i < taskList.length; i++)
    {
        if(taskList[i].id == id)
        {
            $('#edit-task-form #task-id').val(taskList[i].id);
            $('#edit-task-form #task').val(taskList[i].task);
            $('#edit-task-form #priority').val(taskList[i].task_priority);
            $('#edit-task-form #date').val(taskList[i].task_date);
            $('#edit-task-form #time').val(taskList[i].task_time);
        }
    }
}

//Function to Get the HTTP GET Requests
function getQueryParams(qs)
{
    qs = qs.split("+").join(" ");
    
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    
    while(tokens = re.exec(qs))
    {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]); 
    }
    
    return params;
}