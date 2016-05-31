$(document).ready(function(){
    $('#add-task-form').on('submit',function(e){
        addTask(e);
      });
    
    
    //Function to add a Task
    
    function addTask(e){
        
        //get the Unique value i.e. the date with its timestamp
        var newDate = new Date();
        var id = newDate.getTime();
        
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
            if (tasks == null){
                tasks = [];
            }
            
            //Create a task list
            var taskList = JSON.parse(localStorage.getItem('tasks'));
            
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
        
    }
    
});