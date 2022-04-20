#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string>

// void run_process (const char* path);

int main(int argc, char const *argv[])
{
    for(int i = 0; i< 200; i++)
       system("node cliente.js");

    return 0;
}

// void run_process (const char* path){
//     pid_t child_pid;

//     /* Duplicate this process.  */
//     child_pid = fork ();

//     printf("%s", path);
//     if (child_pid != 0){
//         /* This is the parent process.  */

//         int ret = waitpid(child_pid, NULL, 0);

//         if (ret == -1){
//             printf ("an error occurred in waitpid\n");
//             abort ();
//         }
//     }
//     else {
//         execl (path, path);
//         /* The execvp function returns only if an error occurs.  */
//         printf ("an error occurred in execl\n");
//         abort ();
//     }

// }