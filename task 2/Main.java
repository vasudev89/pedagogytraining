// Username: vJ4bzCbrmG
// Database name: vJ4bzCbrmG
// Password: nIjv60X0pJ
// Server: remotemysql.com
// Port: 3306
// javac -cp "mysql-connector-java-8.0.11.jar" Main.java
// java -classpath ".:./mysql-connector-java-8.0.11.jar" Main delhi_weather.csv

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.util.List;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.nio.file.StandardCopyOption;
import java.io.File;

public class Main {
  public static void main(String[] args) {
    
    if(args.length != 1){
      System.out.println("Invalid args: Please provide a single file path");
    }else{
      System.out.println("Perfect args");
      
      Path path = Paths.get(args[0]);
      
      // Path path = Paths.get(args[0]);
      try{
      
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://remotemysql.com:3306/vJ4bzCbrmG?useSSL=false","vJ4bzCbrmG","nIjv60X0pJ");
        System.out.println("Connected to Database");

        String query = "INSERT INTO WEATHER (datetime_utc, _conds, _dewptm, _fog, _hail, _hum, _precipm, _pressurem, _rain, _snow, _tempm, _thunder, _tornado, _wdire) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        PreparedStatement ps = conn.prepareStatement(query);

        System.out.println("Reading File");
        int count= 0;
        List<String> contents = Files.readAllLines(path);
        for(String content:contents){
          count++;

          String linedata[] = content.split(",");
          linedata = java.util.Arrays.copyOf(linedata,14);
          System.out.println(java.util.Arrays.toString(linedata));

          if( count != 1 ){
            int i = 0;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            ps.setString(i+1, linedata[i] == null || linedata[i].equals("") ?"NA":linedata[i]);i++;
            
            // System.out.println(ps.toString());
            ps.addBatch();
            ps.executeUpdate();
            // ps.close();
            // System.out.println("Record Inserted");
            // conn.commit();

          }
          
          
          // if(count!=1) ps.addBatch();

        }

        System.out.println("Executing Batch");
        ps.executeBatch();
        ps.close();
        System.out.println("Batch Executed Successfully");

        conn.close(); System.out.println("Connection to Database Closed");

        System.out.println("Moving to folder");

        File directory = new File("done");
        if (! directory.exists()){
            directory.mkdir();
        }
        Path destinationPath = Paths.get("done/" + args[0]);
        
        try {
          if (! new File("done/" + args[0]).exists()){
              Files.createFile(destinationPath);
          }
          Files.move(path, destinationPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("Moving process over");
      
      }catch(IOException ex){
        ex.printStackTrace();
      }catch(ClassNotFoundException cnfe){
        cnfe.printStackTrace();
      }catch(SQLException sqle){
        sqle.printStackTrace();
      }

    }

  }
}