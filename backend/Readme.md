# Documentation API

This is a API for digsboard as management virtual learning system

---

## Installation

1. `npm i` for install all dependencies
2. `npm run dev` for running server on localhost

---

## Server

- Development `http://localhost:3000/`
- Production `https://be-digsboard.vercel.app/`

---

## Course

1. **GET `/course`** List all the courses *(public)*
   - Request
   - Response
       - `200` OK
  
        ```json
        [
          { "subject": "string"}
        ]
        ```

       - `400` BAD REQUEST
       - `500` SERVER ERROR

2. **POST `/course`** Create a course *(private)*
   - Request
        - Body

          ```json
            {
              "subject": "string"
            }
          ```

   - Response
       - `201` CREATED
       - `400` BAD REQUEST
       - `403` FORBIDDEN
       - `500` SERVER ERROR

3. **PUT `/course/:id`** Update a course *(private)*
   - Request
        - Parameters
          - `id` type (ObjectId)
        - Body

          ```json
            {
              "subject": "string"
            }
          ```

   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `401` UNAUTHORIZED
       - `403` FORBIDDEN
       - `500` SERVER ERROR

4. **DELETE `/course/:id`** Delete a course *(private)*
   - Request
        - Parameters
          - `id` type (ObjectId)

   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `401` UNAUTHORIZED
       - `403` FORBIDDEN
       - `404` NOT FOUND
       - `500` SERVER ERROR  

5. **GET `/course/:id`** Get a course by Id *(public)*
   - Request
        - Parameters
          - `id` type (ObjectId)

   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `500` SERVER ERROR

---

## References

1. **GET `/reference`** List all the references *(public)*
   - Request
   - Response
       - `200` OK
  
        ```json
        [
          { "title": "string",
            "link": "string",
            "semester": "number",
            "courseId": "objectId",
            "createdBy": "objectId"
          }
        ]
        ```

       - `400` BAD REQUEST
       - `500` SERVER ERROR

2. **POST `/reference`** Create a reference *(private)*
   - Request
        - Body

          ```json
            { 
              "title": "string",
              "link": "string",
              "semester": "number",
              "courseId": "objectId",
              "createdBy": "objectId"
            }
          ```

   - Response
       - `201` CREATED
       - `400` BAD REQUEST
       - `403` FORBIDDEN
       - `500` SERVER ERROR

3. **PUT `/reference/:id`** Update a reference *(private)*
   - Request
        - Parameters
          - `id` type (ObjectId)
        - Body

          ```json
            { 
              "title": "string",
              "link": "string",
              "semester": "number",
              "courseId": "objectId",
              "createdBy": "objectId"
            }
          ```

   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `401` UNAUTHORIZED
       - `403` FORBIDDEN
       - `404` NOT FOUND
       - `500` SERVER ERROR  

4. **DELETE `/reference/:id`** Delete a reference *(private)*
   - Request
        - Parameters
          - `id` type (ObjectId)

   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `401` UNAUTHORIZED
       - `403` FORBIDDEN
       - `404` NOT FOUND
       - `500` SERVER ERROR  

5. **GET `/reference/:id`** Get a reference by Id *(private)*
   - Request
       - Parameters
         - `id` type (ObjectId)

   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `500` SERVER ERROR

---

## Users

1. **POST `/user/register`** Register user *(public)*
   - Request
        - Body

          ```json
            { 
              "fullName": "string",
              "email": "string",
              "password": "number"
            }
          ```

   - Response
       - `201` CREATED
       - `400` BAD REQUEST
       - `500` SERVER ERROR  

2. **POST `/user/login`** Login user *(public)*
   - Request
        - Body

          ```json
            { 
              "fullName": "string",
              "email": "string",
              "password": "number"
            }
          ```

   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `404` NOT FOUND
       - `500` SERVER ERROR

3. **GET `/user/logout`** Logout user *(public)*
   - Request
   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `404` NOT FOUND
       - `500` SERVER ERROR

4. **GET `/user`** List all the users *(private)*
   - Request
   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `403` FORBIDDEN
       - `404` NOT FOUND
       - `500` SERVER ERROR

5. **DELETE `/user/:id`** Delete a user *(private)*
   - Request
        - Parameters
          - `id` type (ObjectId)

   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `401` UNAUTHORIZED
       - `403` FORBIDDEN
       - `404` NOT FOUND
       - `500` SERVER ERROR

6. **GET `/user/refresh`** Regenerate access token user *(public)*
   - Request
   - Response
       - `200` OK
       - `400` BAD REQUEST
       - `403` FORBIDDEN
       - `404` NOT FOUND
       - `500` SERVER ERROR

---

## Schemas

1. **Course**
   `subject`*

   example

    ```json
      { 
        "subject": "Proyek Minor Sistem Informasi"
      }
    ```

2. **Reference**
   `title`*
   `link`*
   `semester`*
   `courseId`*
   `createdBy`*

   example

    ```json
      { 
        "title": "Business Process Model and Notation (BPMN) 2.0 Tutorial",
        "link": "https://www.youtube.com/watch?v=BwkNceoybvA",
        "semester": 3,
        "courseId": "6447dd07081f62b8db71b045",
        "createdBy": "6440d4150a73a915567e44fb"
      }
    ```

3. **User**
   `fullName`*
   `email`*
   `password`*

   example

    ```json
      { 
        "fullName": "Nasi Goreng",
        "email": "nasi@gmail.com",
        "password": "Nasigorengkaretnya2!"
      }
    ```
