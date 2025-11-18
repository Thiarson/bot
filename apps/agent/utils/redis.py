from redis import asyncio as aioredis
from config.redis_config import redis_url

async def connect_redis():
    redis = await aioredis.from_url(redis_url)

    await redis.ping()
    print("Connected to redis")

    return redis
