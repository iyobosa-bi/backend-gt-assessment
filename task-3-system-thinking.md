# Task 3 – Basic System Thinking

## 1. Scaling

- **Database turns into a traffic jam**  
  Too much requests will make the database execute multiple queries at a time leading to slow queries or deadlock.

- **Race Conditions**  
   Two people see “3 left” and both buy 2 → you sold 4 items you don’t have.
  Without proper locking or a reservation system, this happens fast when traffic spikes.

- **Slow external service**  
  Due to slowness or lag, on a particular service, it will propagate to other services leading to timeouts of the API
  - **Slow Request Queue Processing**  
    Lots of request on the queue can lead to constant piling up of jobs on the queue.

## 2. Performance Improvements

- **Fix stock with optimistic locking**  
  Add a version/timestamp on the product row.

- **Cache the stuff you read a lot**  
   Store data in Redis/memcached for 30–120 sec for a more easier retrieval insteading of queries hitting the database repeatedly
  Invalidate or update cache when stock changes.

- **Make the API stateless & scale horizontally**  
  Multiple pods/containers behind a load balancer.  
  Sessions/JWT in Redis or just stateless tokens.

- **Database quick wins**  
  Proper indexes on major id columns
  Only SELECT the columns you need.

## 3. Production Monitoring

- **p95 & p99 latency**
- **Error rate**
- **Requests per second / per minute**
- **CPU & memory** per instance/container
- **Database connection usage** (% of pool used, connection wait time)
- **Slow queries**
- **Queue depth/backlog** if using queues (emails piling up?)
- **External service latency** (payment gateway response time, email provider)
