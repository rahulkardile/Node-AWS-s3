import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "",
        secretAccessKey: "kxQTWsP1r234sTFJ5PPZq/Oa3ZNoWT9BAF7IQT4L"
    },
})

async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: "rahul-private-321",
        Key: key
    });

    const url = await getSignedUrl(s3Client, command);
    return url;
}

const putObject = async (fileName, contentType) => {
    const command = new PutObjectCommand({
        Bucket: "rahul-private-321",
        Key: `uploads/users-file/${fileName}`,
        ContentType: contentType
    });

    const url = await getSignedUrl(s3Client, command);
    return url;
}

const listObjects = async () => {
    const command = new ListObjectsV2Command({
        Bucket: "rahul-private-321",
        key: "/"
    })

    const result = await s3Client.send(command);
    console.log(result);
}

const deleteFile = async () => {
    const command = new DeleteObjectCommand({
        Bucket: "rahul-private-321",
        Key: "profile.jpg"
    })

    const result = await s3Client.send(command);
    console.log(result);
}

// deleteFile();

listObjects();

// const init = async () => {
//     console.log("URL for img", await getObjectURL("/uploads/users-file/image-1719577157750.mp4"));
//     // console.log("URL for img", await putObject(`image-${Date.now()}.mp4`, "video/mp4"));
// }

// init();