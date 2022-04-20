/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nodelauncher;

import java.io.IOException;

/**
 *
 * @author davidarnau
 */
public class NodeLauncher {

   /**
     * @param args the command line arguments
     */
 public static void main(String[] args) throws InterruptedException {
        // TODO code application logic here
        for (int i = 0 ; i < Integer.parseInt(args[0]); i++){
            TestTh t1  = new TestTh();
            t1.start();
            System.out.println("Entro");
            t1.join();
        }
    }
}

class TestTh extends Thread {
    @Override
    public void run() {
       try {
           System.out.println("Entro hilo");
//           String [] cmd = {"sh","-c","node cliente.js"};
           String [] cmd = {"sh", "-c", "ls -la"};
        Runtime.getRuntime().exec("ls");
    } catch(IOException e) {
        System.out.println("EXCEPTION: " + e.getMessage());
    }
    }
}
   
