<?php
  
  include("mkapp/compile.php");
  
  $compiler = new MKCompiler("config.json");
  
  $compiler->build();
  
  $compiler->preview();