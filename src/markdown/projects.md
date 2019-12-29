---
path: '/projects'
date: '2019-05-04'
title: 'My first blog post'
---

# Projects

Here are a few of the projects I have worked on:

### 2D Mesh Network

This was our final project for ECE 5745- Complex Digital ASIC Design. My partner Joyce Huang and I took a work-in-progress 2D mesh generator from Professor Christopher Batten's research group and augmented it to evaluate the performance of three types of router microarchitectures on a 4x4 mesh with various traffic patterns. The RTL was generated through PyMTL. The full report can be found here.

#### Lessons Learned

Evaluation can often be the hardest part of a project. Area, energy, and critical path were fairly striaghtforward to evaluate, but performance of a routing network is very difficult to characterize. It is entirely data dependent, and it is also important to look at starvation and fairness issues. We ended up visualizing worst-case latencies for every source/destination pair in our router, which helped us discover some major fairness issues.

## Critter World

My first introduction to software engineering. Over the last two months of my first semester at Cornell, my partner Olivia Xiang and I worked on a cumulative project for CS 2112 (Honors OO Programming) called Critter World. It involved implementing the following:

- A parser and pass framework for a small "critter language," which serves as the DNA of each critter. Each critter is spawned with a program written in "critter language," and during the actual simulation of Critter World, each critter's program will be run to determine its next action.
- A simulator for the Critter World. The Critter Wrold was a grid of hexagons that could have the following:
  - An arbitrary number of critters with different critter programs. These critters can navigate the world and attack each other.
  - Rocks that block critter movement
  - Food for the critters to consume to grow bigger and stronger.
